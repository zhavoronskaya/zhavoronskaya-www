export default /*glsl */ `


uniform float uTime;
uniform sampler2D uTex;
varying vec2 vUv;
varying float vDisplacement;
varying vec3 vNormal;
varying vec3 vPosition;


void main() {


  vec4 color = texture2D(uTex, vUv + vDisplacement).bgba*1.1;
    gl_FragColor = vec4(color);

  // gl_FragColor = vec4(pow(color, vec3(1.0 / 2.2)), 1.0);



}`;
