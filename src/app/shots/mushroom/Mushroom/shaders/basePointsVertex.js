export default /*glsl */ `
#define PI 3.1415926535897932384626433832795


uniform float uSize;
uniform float uTime;
varying vec3 vColor;


float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}
float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}


void main() {
    
//Position
vec3 localSpacePosition = position;
float t = sin(localSpacePosition.y * 0.9 + uTime * 0.86)*cos(localSpacePosition.y * 0.9 + uTime * 1.5);
t = remap(t, -1.0, 1.0, -.3, 0.9);
vec3 normal = normalize(localSpacePosition);
  localSpacePosition += normal * t;
vec4 modelPosition = modelMatrix * vec4(localSpacePosition, 1.0);
vec4 viewPosition = viewMatrix * modelPosition;
vec4 projectedPosition = projectionMatrix * viewPosition;
gl_Position = projectedPosition;


//Size
gl_PointSize = uSize;
gl_PointSize *= (1.0 / - viewPosition.z);

}`;
