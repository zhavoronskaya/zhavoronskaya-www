export default /*glsl */ `
#define PI 3.1415926535897932384626433832795
varying float vElevation;


float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}
float setDistanceToCenter(vec2 uv, vec2 mid) {
    return distance(uv, mid);
 }

void main() {
  // float strength =0.1/setDistanceToCenter(gl_PointCoord, vec2(0.5)) - 0.1*2.0;

  float strength = (0.15) / (distance(vec2(gl_PointCoord.x, (gl_PointCoord.y- 0.5) * 5.0 + 0.5), vec2(0.5)));
        strength *= (0.15) / (distance(vec2(gl_PointCoord.y, (gl_PointCoord.x- 0.5) * 5.0 + 0.5), vec2(0.5)));

   
    vec3 color = mix( vec3(0.78,0.23,0.76), vec3(1.0), strength);
    color = color*vElevation + color;
    gl_FragColor = vec4(color, strength);
}`;
