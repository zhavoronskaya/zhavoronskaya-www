export default /*glsl */ `
#define PI 3.1415926535897932384626433832795



uniform float uTime;


varying vec3 vColor;
varying vec2 vUv;
varying vec3 vwPosition;

varying vec3 vNormal;

varying vec3 vPosition;
varying float vDistance;

uniform float uAvg;


void main() {
    
//Position
vec4 modelPosition = modelMatrix * vec4(position, 1.0);


vec4 viewPosition = viewMatrix * modelPosition;
vec4 projectedPosition = projectionMatrix * viewPosition;
gl_Position = projectedPosition;

vUv = uv;

vNormal = normal;

vPosition = position;
vwPosition = vec3(viewPosition.xyz);
vDistance= 1.0/(length(modelPosition.yz));


}`;
