export default /*glsl */ `
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

uniform float uTime;


float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}


void main() {

//color
vec3 color = vec3(0.0);

  //normal
  vec3 normal = normalize(vNormal);
  //revert normal for backside
  if(!gl_FrontFacing)
        normal *= - 1.0;
  //viewDirection 
  vec3 viewDirection = vPosition - cameraPosition;
  viewDirection = normalize(viewDirection);

  //frenel
  float frenel = dot(viewDirection, normal) +1.0;
  frenel = pow(frenel,2.0);

  //falloff
  float falloff = smoothstep(0.8, 0.0, frenel);


  float hologram = mod(vPosition.y*30.0 - uTime, 1.0);
  hologram = pow(hologram, 4.0);


  hologram *= frenel;
  //add frenel on top
  hologram +=frenel*1.25;
  hologram *=falloff;
  gl_FragColor = vec4(vec3(0.0), hologram);

  #include <tonemapping_fragment>
    #include <colorspace_fragment>
}`;
