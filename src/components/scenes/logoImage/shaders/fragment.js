export default /*glsl */ `


uniform float uTime;
uniform sampler2D uTex;



varying float vElevation;
varying vec2 vUv;


void main() {



    vec3 color = texture2D(uTex, vUv + vElevation).rgb;
    gl_FragColor = vec4(color, 1.0);


}`;
