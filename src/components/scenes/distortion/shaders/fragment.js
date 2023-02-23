export default /*glsl */ `


uniform float uTime;
varying vec2 vUv;
varying float vDisplacement;
varying vec3 vNormal;


vec3 sinColorPalette(float s, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * sin(c * s - d);
}  
void main() {

    float mixStrenght = (vDisplacement)*333.3;
   // sinColorPalette( (mixStrenght*mixStrenght), vec3(0.56,0.2,0.852), vec3(0.5,0.5,0.5), vec3(0.489,0.2,0.943), vec3(0.739,0.2,0.7625));

    vec3 color =  sinColorPalette( mixStrenght,  vec3(0.56,0.2,0.852), vec3(0.5,0.5,0.5), vec3(0.489,0.2,0.943), vec3(0.739,0.2,0.7625));;
   //color= mix(color,vec3(0.889,0.2,0.9), clamp(mixStrenght,0.0,1.5));
    gl_FragColor = vec4(color,1.0);

}`;
