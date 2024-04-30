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

float setShyny(vec2 uv, vec2 mid, float value) {
return (value/ distance(uv, mid)) - 2.0 * value;
}

void main() {

  vec2 uv = gl_PointCoord;
  vec3 tex = texture2D(uTexture, uv).rgb;
  float alpha = tex.r;

  float shyny = setShyny(uv, vec2(0.5), 0.1);

  gl_FragColor = vec4(0.0);

  #include <tonemapping_fragment>
    #include <colorspace_fragment>
}`;
