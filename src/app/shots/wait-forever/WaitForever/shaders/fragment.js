export default /*glsl */ `


uniform float uTime;
uniform float uDelay;
uniform sampler2D uTex;
uniform sampler2D uTex1;
uniform sampler2D uTex2;
uniform sampler2D uTex3;
varying vec2 vUv;
varying float vDisplacement;
varying vec3 vNormal;
varying vec3 vPosition;


void main() {
  vec2 p = -1.0 + 2.0 * (vUv+ vDisplacement);
  float len = length(p);

 
  vec4 sample1 = texture2D(uTex, vUv + vDisplacement).rgba;
  vec4 sample2 = texture2D(uTex1, vUv + vDisplacement).rgba;
  vec4 sample3 = texture2D(uTex2, vUv+ vDisplacement).rgba;
  vec4 sample4 = texture2D(uTex3, vUv+ vDisplacement).rgba;

  float fade = smoothstep(uDelay*2.5, uDelay*1.0, len);
  // vec4 color = mix(sample1, sample2, fade);

  
  vec4 color = vec4(0.0);

  float textLength = 10.0;
  float textTime = mod(uDelay,textLength);

  if (textTime < textLength * 0.25) {
    color = mix(sample1, sample2, smoothstep(0.0, textLength * 0.25, textTime));
  } else if (textTime < textLength * 0.5) {
    color = mix(sample2, sample3, smoothstep(textLength * 0.25, textLength * 0.5, textTime));
  } else if (textTime < textLength * 0.75) {
    color = mix(sample3, sample4, smoothstep(textLength * 0.5, textLength * 0.75, textTime));
  } else {
    color = mix(sample4, sample1, smoothstep(textLength * 0.75, textLength, textTime));
  }
  


// color = mix(color,sample3,smoothstep((delta)*0.4, delta*0.38, len));
// color = mix(color,sample4,smoothstep(delta*0.1, delta*0.098, len));

    gl_FragColor = vec4(color);

 



}`;
