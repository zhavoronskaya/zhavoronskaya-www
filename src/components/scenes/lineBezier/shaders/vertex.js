export default /*glsl */ `
#define PI 3.1415926535897932384626433832795


uniform float uTime;

varying vec2 vUv;


void main() {
  //Position
vec4 modelPosition = modelMatrix * vec4(position, 1.0);

//rotate
float angle = atan(modelPosition.x, modelPosition.z);
float distanceToCenter = length(modelPosition.xz);
float angleOffset = (1.0 / distanceToCenter) * (uTime*0.5);
angle += angleOffset;
modelPosition.x = cos(angle) * distanceToCenter * cos(7.1*modelPosition.z)-sin(angle)*distanceToCenter * cos(7.1*modelPosition.x);
modelPosition.z = sin(angle) * distanceToCenter * cos(7.1*modelPosition.x)-sin(angle)*distanceToCenter * cos(7.1*modelPosition.z);
// //add randomness after spin
// modelPosition.xyz += 0.4;
vec4 viewPosition = viewMatrix * modelPosition;
vec4 projectedPosition = projectionMatrix * viewPosition;
gl_Position = projectedPosition;

vUv = uv;

} `;
