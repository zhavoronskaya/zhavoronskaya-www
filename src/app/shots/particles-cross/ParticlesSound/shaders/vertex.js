export default /*glsl */ `
#define PI 3.1415926535897932384626433832795


uniform float uSize;
uniform float uTime;

varying vec3 vColor;
varying vec3 vNormal;

varying vec3 vPosition;




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

float t = sin(localSpacePosition.x * 20.0 + uTime)*cos(localSpacePosition.z + uTime);
t = remap(t, -1.0, 1.0, 0.0, 0.8);
localSpacePosition += normal * t;


  vNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
  vPosition = (modelMatrix * vec4(localSpacePosition, 1.0)).xyz;
  vColor = mix(
      vec3(0.645, 0.0, 0.821),
      vec3(0.21, 0.566, 0.76),
      smoothstep(0.0, 0.8, t));

vec4 modelPosition = modelMatrix * vec4(position, 1.0);
modelPosition.y +=  t;

vec4 viewPosition = viewMatrix * modelPosition;
vec4 projectedPosition = projectionMatrix * viewPosition;
gl_Position = projectedPosition;




//Size
gl_PointSize = uSize;
gl_PointSize *= (1.0 / - viewPosition.z);

}`;
