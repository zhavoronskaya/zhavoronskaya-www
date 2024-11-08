// eslint-disable-next-line import/no-anonymous-default-export
export default /*glsl */ `
#define HIGH_PRECISION
varying vec2 vUv;
uniform sampler2D uImage;
uniform float uTime;
uniform float uProgress;
uniform float uRatio;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform float uActive;



const float GAMMA = 2.2;

vec3 gamma(vec3 color, float g) {
  return pow(color, vec3(g));
}

vec3 linearToScreen(vec3 linearRGB) {
  return gamma(linearRGB, 1.0 / GAMMA);
}

float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}



void main() {

  vec2 uv = vUv;
  //fix size

  uv.x*=uRatio;
  uv.x += 0.5*(1.0 -uRatio);

  //rounded
  vec2 coords = (vUv) * uResolution;
  float radius = 0.8;
  float roundedAlpha = step(length(max(abs(coords- uResolution.xy / 2.)-(uResolution.xy / 2.)+radius,0.0))-radius, 0.);

  float time = mod(uTime,10.);
  time= abs(sin(uTime*0.5));
  vec2 stripe = floor( (vUv - vec2(0.5,0.5)) * vec2(10.0, 1.0) + vec2(0.5,0.5))/ vec2(10.0, 1.0)*0.3;
  uv = uv - stripe*uActive;
  
  vec3 tex = texture2D(uImage, uv).rgb;
  gl_FragColor = vec4(vec3(tex),roundedAlpha);
}`;
