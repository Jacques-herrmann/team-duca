// Copyright Inigo Quilez, 2013 - https://iquilezles.org/
// I am the sole copyright owner of this Work.
// You cannot host, display, distribute or share this Work neither
// as it is or altered, here on Shadertoy or anywhere else, in any
// form including physical and digital. You cannot use this Work in any
// commercial or non-commercial product, website or project. You cannot
// sell this Work and you cannot mint an NFTs of it or train a neural
// network with it without permission. I share this Work for educational
// purposes, and you can link to it, through an URL, proper attribution
// and unmodified screenshot, as part of your educational material. If
// these conditions are too restrictive please contact me and we'll
// definitely work it out.


// Volumetric clouds. Not physically correct in any way - 
// it does the wrong extintion computations and also
// works in sRGB instead of linear RGB color space. No
// shadows are computed, no scattering is computed. It is
// a volumetric raymarcher than samples an fBM and tweaks
// the colors to make it look good.
//
// Lighting is done with only one extra sample per raymarch
// step instead of using 3 to compute a density gradient,
// by using this directional derivative technique:
//
// https://iquilezles.org/articles/derivative


uniform float iTime;
//uniform vec2 iResolution;
//uniform vec4 iMouse;
uniform sampler2D iChannel0;
uniform sampler2D iChannel1;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vDirection;

// 0: two 2d texture lookups with hardware interpolation
// 1: two 2d texture lookups with software interpolation
#define NOISE_METHOD 1

// 0: no LOD
// 1: yes LOD
#define USE_LOD 1


mat3 setCamera( in vec3 ro, in vec3 ta, float cr ){
    vec3 cw = normalize(ta-ro);
    vec3 cp = vec3(sin(cr), cos(cr),0.0);
    vec3 cu = normalize( cross(cw,cp) );
    vec3 cv = normalize( cross(cu,cw) );
    return mat3( cu, cv, cw );
}

float noise( in vec3 x )
{
    vec3 p = floor(x);
    vec3 f = fract(x);
	f = f*f*(3.0-2.0*f);

#if NOISE_METHOD==0
	vec2 uv = (p.xy+vec2(37.0,239.0)*p.z) + f.xy;
    vec2 rg = textureLod(iChannel0,(uv+0.5)/256.0,0.0).yx;
	return mix( rg.x, rg.y, f.z )*2.0-1.0;
#endif    
#if NOISE_METHOD==1
    ivec3 q = ivec3(p);
	ivec2 uv = q.xy + ivec2(37,239)*q.z;
	vec2 rg = mix(mix(texelFetch(iChannel0,(uv           )&255,0),
				      texelFetch(iChannel0,(uv+ivec2(1,0))&255,0),f.x),
				  mix(texelFetch(iChannel0,(uv+ivec2(0,1))&255,0),
				      texelFetch(iChannel0,(uv+ivec2(1,1))&255,0),f.x),f.y).yx;
	return mix( rg.x, rg.y, f.z )*2.0-1.0;
#endif    
}

float map( in vec3 p, int oct )
{
	vec3 q = p - vec3(0.0,0.1,1.0)*iTime;
    float g = 0.5+0.5*noise( q*0.3 );
    
	float f;
    f  = 0.50000*noise( q ); q = q*2.02;
    #if USE_LOD==1
    if( oct>=2 ) 
    #endif
    f += 0.25000*noise( q ); q = q*2.23;
    #if USE_LOD==1
    if( oct>=3 )
    #endif
    f += 0.12500*noise( q ); q = q*2.41;
    #if USE_LOD==1
    if( oct>=4 )
    #endif
    f += 0.06250*noise( q ); q = q*2.62;
    #if USE_LOD==1
    if( oct>=5 )
    #endif
    f += 0.03125*noise( q ); 
    
    f = mix( f*0.1-0.5, f, g*g );
        
    return 1.5*f - 0.5 - p.y;
}

const int kDiv = 1; // make bigger for higher quality
const vec3 sundir = normalize( vec3(1.0,0.0,-1.0) );

vec4 raymarch( in vec3 ro, in vec3 rd, in vec3 bgcol, in ivec2 px )
{
    // bounding planes	
    const float yb = -3.0;
    const float yt =  0.6;
    float tb = (yb-ro.y)/rd.y;
    float tt = (yt-ro.y)/rd.t;

    // find tigthest possible raymarching segment
    float tmin, tmax;
    if( ro.y>yt )
    {
        // above top plane
        if( tt<0.0 ) return vec4(0.0); // early exit
        tmin = tt;
        tmax = tb;
    }
    else
    {
        // inside clouds slabs
        tmin = 0.0;
        tmax = 60.0;
        if( tt>0.0 ) tmax = min( tmax, tt );
        if( tb>0.0 ) tmax = min( tmax, tb );
    }
    
    // dithered near distance
    float t = tmin + 0.1*texelFetch( iChannel1, px&1023, 0 ).x;
    
    // raymarch loop
	vec4 sum = vec4(0.0);
    for( int i=0; i<190*kDiv; i++ )
    {
       // step size
       float dt = max(0.05,0.02*t/float(kDiv));

       // lod
       #if USE_LOD==0
       const int oct = 5;
       #else
       int oct = 5 - int( log2(1.0+t*0.5) );
       #endif
       
       // sample cloud
       vec3 pos = ro + t*rd;
       float den = map( pos,oct );
       if( den>0.01 ) // if inside
       {
           // do lighting
           float dif = clamp((den - map(pos+0.3*sundir,oct))/0.25, 0.0, 1.0 );
           vec3  lin = vec3(0.65,0.65,0.75)*1.1 + 0.8*vec3(1.0,0.6,0.3)*dif;
           vec4  col = vec4( mix( vec3(1.0,0.93,0.84), vec3(0.25,0.3,0.4), den ), den );
           col.xyz *= lin;
           // fog
           col.xyz = mix(col.xyz,bgcol, 1.0-exp2(-0.1*t));
           // composite front to back
           col.w    = min(col.w*8.0*dt,1.0);
           col.rgb *= col.a;
           sum += col*(1.0-sum.a);
       }
       // advance ray
       t += dt;
       // until far clip or full opacity
       if( t>tmax || sum.a>0.99 ) break;
    }

    return clamp( sum, 0.0, 1.0 );
}

vec4 render( in vec3 ro, in vec3 rd, in ivec2 px )
{
	float sun = clamp( dot(sundir,rd), 0.0, 1.0 );

    // background sky
    vec4 col = vec4(0.76,0.75,0.95, 0.);
    //col = vec3(252. / 255., 209. / 255., 147. / 255.);
    //col = vec3(0.);
    col -= 0.6*vec4(0.90,0.75,0.95, 0.)*rd.y;
	col += 0.2*vec4(1.00,0.60,0.10, 0.)*pow( sun, 8.0 );

    // clouds    
    vec4 res = raymarch( ro, rd, col.xyz, px );
    col = col*(1.0-res.w) + res;
    
    // sun glare    
	//col += 0.2*vec4(1.0,0.4,0.2, 0.)*pow( sun, 3.0 );

    // tonemap
  //  col = smoothstep(0.15,1.1,col);
 
    return col;
}

void main() {
    //vec2 fragCoord = vUv*iResolution.xy;
    //vec2 p = (2.0*fragCoord-iResolution.xy)/iResolution.y;
    //vec2 m =                iMouse.xy      /iResolution.xy;

    vec3 ro = vPosition;
    vec3 rd = vDirection;

    // camera
    //vec3 ro = 4.0*normalize(vec3(sin(3.0*m.x), 0.8*m.y, cos(3.0*m.x))) - vec3(0.0,0.1,0.0);
	//vec3 ta = vec3(0.0, -1.0, 0.0);
    //mat3 ca = setCamera( ro, ta, 0.07*cos(0.25*iTime) );
    // ray
    //rd = ca * normalize( vec3(p.xy,1.5));

    
    gl_FragColor = render( ro, rd, ivec2(gl_FragCoord.xy-0.5) );
}
