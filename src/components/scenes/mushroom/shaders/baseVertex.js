export default /*glsl */ `
#define PI 3.1415926535897932384626433832795
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vColour;

uniform float uTime;


float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}


void main() {	
  vec3 localSpacePosition = position;

  float t = sin(localSpacePosition.y * 0.9 + uTime * 0.86)*cos(localSpacePosition.y * 0.9 + uTime * 1.5);
  t = remap(t, -1.0, 1.0, 0.0, 0.4);
  localSpacePosition += normal * t;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(localSpacePosition, 1.0);
  vNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
  vPosition = (modelMatrix * vec4(localSpacePosition, 1.0)).xyz;
  vColour = mix(
      vec3(0.81, 0.85, 0.999),
      vec3(0.99, 0.76, 0.99),
      smoothstep(0.0, 0.4, t));
} `;
