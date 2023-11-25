export default /*glsl */ `
#define PI 3.1415926535897932384626433832795


uniform float uSize;
uniform float uTime;


float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}
float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}


void main() {
    
//Position
// vec4 modelPosition = modelMatrix * vec4(position, 1.0);

// // modelPosition.y += sin(modelPosition.x +uTime);

// vec4 viewPosition = viewMatrix * modelPosition;
// vec4 projectedPosition = projectionMatrix * viewPosition;
// gl_Position = projectedPosition;

vec3 localSpacePosition = position;

float t = sin(localSpacePosition.y * 0.5 + uTime * 10.0)*cos(localSpacePosition.y * 0.9 + uTime * 8.0);
  t = remap(t, -1.0, 1.0, 0.0, 0.6);
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
