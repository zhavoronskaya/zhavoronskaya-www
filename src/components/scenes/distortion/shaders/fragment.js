export default /*glsl */ `


uniform float uTime;
varying vec2 vUv;
varying float vDisplacement;

vec3 sinColorPalette(float s, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * sin(12.5 * (c * s + d));
}  
void main() {

 float mixStrenght = (vDisplacement+7.3)*32.2;


vec3 color = sinColorPalette(mixStrenght, vec3(0.56,0.2,0.852), vec3(0.5,0.5,0.5), vec3(0.489,0.2,0.943), vec3(0.839,0.2,0.7625));
// vec3 color= mix(vec3(0.8,0.0,0.7),vec3(0.489,0.2,0.9), mixStrenght);
    gl_FragColor = vec4(color,  mixStrenght);

  



}`;
