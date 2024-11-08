export default /*glsl */ `


uniform float uTime;
uniform vec2 uResolution;
uniform sampler2D uTex;



varying float vElevation;
varying vec2 vUv;



void main() {

 
    vec4 color = texture2D(uTex, vUv+vElevation);
    gl_FragColor = vec4(color);


}`;
