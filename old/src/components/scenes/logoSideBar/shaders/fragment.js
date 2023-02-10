export default /*glsl */ `


// #define PI 3.1415926535897932384626433832795

// uniform vec2 u_resolution;
// uniform float u_time;




uniform float uTime;
uniform sampler2D uTex;
// uniform sampler2D uDataTexture;


varying float vElevation;
varying vec2 vUv;


void main() {

    //Add displacement with normal Map
    // vec3 normalColor = texture2D(uNormalMap, vUv).xyz * 2.0 - 1.0;
    // vec2 newUv = vUv + normalColor.xy * 0.1;

    vec3 color = texture2D(uTex, vUv + vElevation).rgb;
    gl_FragColor = vec4(color, 1.0);


    // vec2 newUV = ((vUv + vElevation) - vec2(0.5))*5.0 + vec2(0.5);
    // gl_FragColor = texture2D(uTex,newUV);

    // vec4 color = texture2D(uTex,newUV);
    // vec4 offset = texture2D(uDataTexture,vUv);
    // // we are distorting UVs with new texture values
    // gl_FragColor = texture2D(uTex,newUV - 0.02*offset.rg);




}`;
