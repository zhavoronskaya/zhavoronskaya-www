export default /*glsl */ `
uniform float uTime;
uniform vec3 uColor;


varying vec2 vUv;


void main() {

    // vec3 color = vec3(0.026,0.32,0.338);
    vec3 color = uColor;
  // Add a fiery glow
//   float glowAmount = smoothstep(0.0, 32.0, 0.5);
//   glowAmount = 1.0 - pow(glowAmount, 0.025);
//   color += glowAmount * vec3(1.0, 0.2, 0.05);

    gl_FragColor = vec4(color, 0.24);
}`;
