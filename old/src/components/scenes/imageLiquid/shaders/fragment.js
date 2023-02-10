export default /*glsl */ `


// #define PI 3.1415926535897932384626433832795

// uniform vec2 u_resolution;
// uniform float u_time;




uniform float uTime;
uniform sampler2D uTex;


varying float vElevation;
varying vec2 vUv;


void main() {

    //Add displacement with normal Map
    // vec3 normalColor = texture2D(uNormalMap, vUv).xyz * 2.0 - 1.0;
    // vec2 newUv = vUv + normalColor.xy * 0.1;

    vec3 color = texture2D(uTex, vUv + vElevation).rgb;

    // //light correction
    // vec3 lightDirection = normalize(vec3(-1.0, 1.0, 0.0));
    //         float lightness = clamp(dot(color.rgb, lightDirection), 0.0, 1.0);
    //         color.rgb += lightness * 2.0;

    gl_FragColor = vec4(color, 1.0);
}`;
