export default /*glsl */ `
varying vec2 vUv;

uniform vec2 uResolution;
uniform float uTime;
uniform sampler2D uSmokeTexture;

float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}


void main() {



  // scale uv
  vec2 smokeUv = vUv;
    smokeUv.x *= 0.4;
    smokeUv.y *= 0.5;

    smokeUv.x -= 0.1 * uTime;

  float smoke = texture2D(uSmokeTexture, smokeUv).r;

  //remap texture for more transparent area edges
  smoke = smoothstep(0.4,1.0,smoke);

  smoke *= smoothstep(0.0,0.1,vUv.x);
  smoke  *= 1.0 - smoothstep(0.9,1.0,vUv.x);
  smoke  *= smoothstep(0.0,0.1,vUv.y);
  smoke  *= smoothstep(1.0,0.9,vUv.y);



//color
vec3 color = vec3(0.0);
color = mix(color, vec3(0.67,0.2,0.87),smokeUv.x );

  gl_FragColor = vec4(vec3(0.0), smoke);

  #include <tonemapping_fragment>
    #include <colorspace_fragment>
}`;
