export default /*glsl */ `
uniform vec2 uResolution;
uniform float uTime;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;


float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}


void main() {

gl_FragColor = vec4(vec3(0.0), 1.0);

  #include <tonemapping_fragment>
    #include <colorspace_fragment>
}`;
