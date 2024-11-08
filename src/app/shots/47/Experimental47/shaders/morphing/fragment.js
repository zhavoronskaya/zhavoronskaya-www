export default /*glsl */ `


uniform vec2 uResolution;
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

  float distanceToCenter = length(gl_PointCoord-0.5);
  float alpha = 0.05/distanceToCenter - 0.1;
  // vec3 color = mix( vec3(240./255.,140./255.,174./255.), vec3(0.47,0.1,0.87), vColor.r);
  gl_FragColor = vec4(vColor, alpha);

  #include <tonemapping_fragment>
    #include <colorspace_fragment>
}`;
