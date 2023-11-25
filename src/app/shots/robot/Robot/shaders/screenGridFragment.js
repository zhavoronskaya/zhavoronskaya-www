export default /*glsl */ `
#define PI 3.1415926535897932384626433832795




varying vec2 vUv;


uniform float uTime;



float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}


//Background
vec3 BackgroundColor(vec3 screenColor) {
  float distFromCenter = length(abs(vUv - 0.5));

  float vignette = 1.0 - distFromCenter;
  vignette = smoothstep(0.0, 0.8, vignette);
 // vignette = remap(vignette, 0.0, 1.0, 0.4, 1.0);
  screenColor = mix( screenColor,vec3(0.9),vignette);
  return vec3(screenColor);
}

vec3 drawGrid(
  vec3 color, vec3 lineColor, float cellSpacing, float lineWidth) {
  vec2 center = vUv - 0.5;
  vec2 cells = abs(fract(center * 1000.0 / cellSpacing) - 0.5);
  float distToEdge = (0.5 - max(cells.x, cells.y)) * cellSpacing;
  float lines = smoothstep(0.0, lineWidth, distToEdge);

  color = mix(lineColor, color, lines);

  return color;
}



void main() {


  vec3 color = vec3(0.775,0.604,1.0);

  //Background
  color = BackgroundColor(color);
  color = drawGrid(color, vec3(0.2,0.2,0.4), 20.0, 2.0);
  color = drawGrid(color, vec3(0.1,0.1,0.2), 200.0, 4.0);

  gl_FragColor = vec4(vec3(color), 1.0);
}`;
