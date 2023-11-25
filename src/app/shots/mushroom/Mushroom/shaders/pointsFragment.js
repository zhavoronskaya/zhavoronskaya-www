export default /*glsl */ `
varying vec3 vColor;
uniform float uTime;


float setDistanceToCenter(vec2 uv, vec2 mid) {
    return distance(uv, mid);
 }



void main() {
    float distToStar = setDistanceToCenter(gl_PointCoord, vec2(0.5));
    float glow = exp(-30.0 * distToStar / 2.0);
    vec3 color = mix(vec3(0.7,0.8,0.3),vec3(0.9,0.9,0.1),smoothstep(0.0,0.4, glow));

  gl_FragColor = vec4(pow(color, vec3(1.0 / 2.2)), glow);
}`;
