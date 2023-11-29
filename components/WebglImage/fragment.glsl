precision highp float;

uniform sampler2D uTexture;
uniform sampler2D uDMap;
uniform vec2 uMouse;
uniform float uTime;
uniform vec4 uResolution;
uniform float uStrength;
uniform float uEdgesExagerationFactor;

varying vec2 vUv;

vec2 mirrored(vec2 v) {
    vec2 m = mod(v,2.);
    return mix(m,2.0 - m, step(1.0 ,m));
}

float easeOut(float x) {
    return 1.0 - pow(1.0 - x, uEdgesExagerationFactor);
}


void main() {
    vec2 newUV = (vUv - vec2(0.5))*uResolution.zw + vec2(0.5);

    vec2 scaledUv = newUV * 2.0 - 1.0;
    scaledUv *= (1.0 + uStrength * 0.5);
    scaledUv = (scaledUv + 1.0) * 0.5;

    vec2 mouse = uMouse;
    mouse.x = clamp(mouse.x, -0.1, 1.1);
    mouse.y = clamp(mouse.y, -0.1, 1.1);
    mouse = mouse * 2.0 - 1.0;

    vec4 depthMap = texture2D(uDMap, mirrored(newUV));
    vec4 originalMap = texture2D(uTexture, mirrored(newUV));

    float displacement = (depthMap.r - 0.5) * uStrength;
    vec2 displacedUv = newUV + mouse * displacement;

    vec4 displacedMap = texture2D(uTexture, mirrored(displacedUv));

    // now detect where the edges are going to "bleed"
    // ie where the difference between normal depthmap and displaced depthmap is the biggest
    vec4 displacedHeighuTexture = texture2D(uDMap, mirrored(displacedUv));
    //vec4 displacedHeighuTexture = texture2D(uDMap, mirrored(scaledUv + mouse * displacement));

    float edgesDiff = abs(displacedHeighuTexture.r - depthMap.r);
    edgesDiff = smoothstep(0.0, 1.0, edgesDiff);


    gl_FragColor = mix(displacedMap, originalMap, smoothstep(0.0, 0.15, displacedHeighuTexture.r) * easeOut(edgesDiff));
}