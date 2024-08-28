export default /*glsl */ `
varying vec3 vColor;
uniform float uTime;


float setDistanceToCenter(vec2 uv, vec2 mid) {
    return distance(uv, mid);
 }

float setShyny(vec2 uv, vec2 mid, float value) {
return (value/ setDistanceToCenter(uv, mid)) - 2.0 * value;
}



void main() {
    float strength = setShyny(gl_PointCoord , vec2(0.5), 0.05);   
    vec3 color = vColor;
 
    color = pow(color, vec3(1.0 / 0.9));

    gl_FragColor = vec4(vec3(color), strength);
}`;
