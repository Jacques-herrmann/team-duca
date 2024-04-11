varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vDirection;

void main() {

    vec3 worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    vDirection = normalize(worldPosition - cameraPosition);
    vPosition = position;
    vNormal = normal.xyz;
    vUv = uv;

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}