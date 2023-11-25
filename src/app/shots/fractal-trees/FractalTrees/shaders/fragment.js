export default /*glsl */ `
uniform vec3 uColor;

float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}


void main() {

  gl_FragColor = vec4(pow(uColor, vec3(1.0 / 2.2)), 1.0);
}`;
