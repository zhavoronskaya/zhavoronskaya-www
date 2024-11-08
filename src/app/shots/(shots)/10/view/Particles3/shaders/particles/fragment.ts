export default /*glsl */ `
varying vec3 vColor;
uniform float uTime;

#define PI 3.1415926535897932384626433832795

float twinkle(vec2 p, vec2 mid, float freq,  float value) {
    float strength =value / (distance(vec2(p.x, (p.y - mid.y) * freq + 0.5), mid));
    strength *= value / (distance(vec2(p.y, (p.x - mid.x) * freq + 0.5), mid));
    return strength;
}

vec2 rotate(vec2 p, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (p.x - mid.x) + sin(rotation) * (p.y - mid.y) + mid.x,
      cos(rotation) * (p.y - mid.y) - sin(rotation) * (p.x - mid.x) + mid.y
    );
}
float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 coord = gl_PointCoord;
    coord = rotate(coord, uTime*PI*3.0,vec2(0.5));

    float strength = twinkle(coord, vec2(0.5), 5.0, 0.08);

    vec3 color = mix( vColor, vec3(0.397,0.67,0.71), smoothstep(0.0,1.0, strength));

    color = pow(color, vec3(1.0 / 0.9));
    strength = pow(strength, 1.0/0.4);
    gl_FragColor = vec4(vec3(color), strength);
}`;
