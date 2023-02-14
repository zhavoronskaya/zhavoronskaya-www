export default /*glsl */ `

uniform float uTime;
uniform sampler2D uTex;


varying float vElevation;
varying vec2 vUv;


void main() {


    vec3 color = texture2D(uTex, vUv + vElevation).rgb;

    // //light correction
    vec3 lightDirection = normalize(vec3(1.0, 1.0, 0.0));
    float lightness = clamp(dot(color.rgb, lightDirection), 0.0, 1.0);
    color.rgb += lightness * 0.5;

    gl_FragColor = vec4(color, 1.0);
}`;
