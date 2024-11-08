export default /*glsl */ `

uniform vec3 uColor;
uniform float uTime;
varying float vDisplacement;
varying float vDisplacementIntensity;

float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}

void main() {
  vec2 xy = gl_PointCoord.xy - vec2(0.5);
  float ll = length(xy);

    if(ll > 0.5)
        discard;
    // if(vDisplacement>0.0)
    // {
    //       gl_FragColor = vec4(mix(vec3(0.31,0.32,0.96),uColor, clamp(vDisplacement,0.0,1.0)*smoothstep(0.0,1.0,vdisplacementIntensity)), step(ll, 0.5) * 0.45);
    // }
    // else {
    //         gl_FragColor = vec4(mix(uColor,vec3(0.31,0.32,0.96),smoothstep(0.0,1.0, vdisplacementIntensity)), step(ll, 0.5) * 0.45);
    // }
    float displacement = remap(vDisplacementIntensity, 0.1,0.7,0.0,1.0);
    gl_FragColor = vec4(mix(uColor,vec3(0.1,0.42,0.82), displacement), step(ll, 0.5) * 0.45);

  // gl_FragColor = vec4(color, step(ll, 0.5) * 0.45);


  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;
