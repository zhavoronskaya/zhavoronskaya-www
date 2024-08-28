export default /*glsl */ `
varying vec3 vColor;
uniform float uTime;


float setDistanceToCenter(vec2 uv, vec2 mid) {
    return distance(uv, mid);
 }

void main() {
    float strength =0.1/setDistanceToCenter(gl_PointCoord, vec2(0.5)) - 0.1*2.0;
    vec3 color = vColor;
 
    color = pow(color, vec3(1.0 / 0.9));

    gl_FragColor = vec4(vec3(color), strength);
}`;
