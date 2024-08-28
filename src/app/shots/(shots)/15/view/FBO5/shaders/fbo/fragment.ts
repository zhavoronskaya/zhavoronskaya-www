export default /*glsl */ `
varying vec3 vColor;
uniform float uTime;



void main() {

    float strength =1.0 - step(0.5, distance(gl_PointCoord, vec2(0.5)) + 0.25);
    vec3 color = vColor;
    gl_FragColor = vec4(vec3(color), strength);
}`;
