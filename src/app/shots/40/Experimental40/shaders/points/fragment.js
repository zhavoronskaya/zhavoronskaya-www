export default /*glsl */ `


uniform vec2 uResolution;
uniform float uTime;
uniform sampler2D uTexture;



float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}


void main() {

  vec2 uv = gl_PointCoord;
  vec3 tex = texture2D(uTexture, uv).rgb;
  float alpha = tex.r;

  gl_FragColor = vec4(vec3(0.0), alpha);

  #include <tonemapping_fragment>
    #include <colorspace_fragment>
}`;
