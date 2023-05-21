export default /*glsl */ `
#define PI 3.1415926535897932384626433832795




varying vec2 vUv;
uniform vec2 uResolution;
uniform float uAvg;
// uniform vec2 1000.0;
uniform float uTime;


vec3 BLUE = vec3(0.25, 0.25, 1.0);

vec3 PURPLE = vec3(0.887, 0.0, 1.0);

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


//Face
float sdfCircle(vec2 p, float r) {
  return length(p) - r;
}

float sdfLine(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);

  return length(pa - ba * h);
}


// Inigo Quilez
// https://iquilezles.org/articles/distfunctions2d/

float dot2(vec2 v ) { return dot(v,v); }

float sdHeart( vec2 p )
{
    p.x = abs(p.x);

    if( p.y+p.x>1.0 )
        return sqrt(dot2(p-vec2(0.25,0.75))) - sqrt(2.0)/4.0;
    return sqrt(min(dot2(p-vec2(0.00,1.00)),
                    dot2(p-0.5*max(p.x+p.y,0.0)))) * sign(p.x-p.y);
}

float sdfBox(vec2 p, vec2 b) {
  vec2 d = abs(p) - b;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

float sdRoundedX( vec2 p,  float w, float r )
{
    p = abs(p);
    return length(p-min(p.x+p.y,w)*0.5) - r;
}

float opUnion(float d1, float d2) {
  return min(d1, d2);
}

float opSubtraction(float d1, float d2) {
  return max(-d1, d2);
}

float opIntersection(float d1, float d2) {
  return max(d1, d2);
}

mat2 rotate2D(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}

float softMax(float a, float b, float k) {
  return log(exp(k * a) + exp(k * b)) / k;
}

float softMin(float a, float b, float k) {
  return -softMax(-a, -b, k);
}

float softMinValue(float a, float b, float k) {
  float h = exp(-b * k) / (exp(-a * k) + exp(-b * k));
  // float h = remap(a - b, -1.0 / k, 1.0 / k, 0.0, 1.0);
  return h;
}

void main() {
vec2 ures = vec2(1000.0, 600.0);
  vec2 pixelCoords = (vUv-0.5) * uResolution;;

  vec3 color = vec3(0.775,0.604,1.0);

  //Background
  color = BackgroundColor(color);
  color = drawGrid(color, vec3(0.2,0.2,0.4), 20.0, 2.0);
  color = drawGrid(color, vec3(0.1,0.1,0.2), 200.0, 4.0);

vec2 heartCoord = vec2(-250.0, -100.0);
  // float d = sdfCircle(pixelCoords, 300.0);
  float box;
  float d1;
  float d2;
if (uAvg >80.0){
   box = sdfBox(rotate2D(0.0 * 0.5)* (pixelCoords - vec2(0.0,130.0)), vec2(100.0+uAvg, 50.0+uAvg/2.0));

    d1 = sdHeart(rotate2D(PI)*pixelCoords/vec2(120.0+uAvg/10.0,100.0+uAvg/12.0) - vec2(1.5, 1.3));
    

    d2 = sdHeart(rotate2D(PI)*pixelCoords/vec2(120.0+uAvg/10.0,100.0+uAvg/12.0) - vec2(-1.5, 1.3));
}
else {
 box = sdfBox(rotate2D(0.0 * 0.5)* (pixelCoords - vec2(0.0,130.0)), vec2(140.0, 80.0));
 d1 = sdfBox(rotate2D(0.0 * 0.5)* (pixelCoords - vec2(150.0,-200.0)), vec2(100.0, 10.0));

d2 = sdfBox(rotate2D(0.0 * 0.5)* (pixelCoords - vec2(-150.0,-200.0)), vec2(100.0, 10.0));
}


  float d = opUnion(d1, d2);
  

  vec3 sdfColor = mix(
      PURPLE, BLUE, smoothstep(0.0, 0.6, softMinValue(box, d, 0.02)));

  d = step(0.5,softMin(box, d, 0.05));
  color = mix(sdfColor, color, smoothstep(0.0, 1.0, d));
  gl_FragColor = vec4(vec3(color), 1.0);
}`;
