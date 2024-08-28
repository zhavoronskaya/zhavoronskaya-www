export default /*glsl */ `
varying vec2 vUv;

uniform vec2 uResolution;
uniform float uTime;

varying vec3 vNormal;
varying vec3 vPosition;
varying float vDistance;

float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}


float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

vec3 sinColorPalette(float s, vec3 a, vec3 b, vec3 c, vec3 d) {
  return clamp(smoothstep(0.2,0.8, a + b * sin(c * s + d)*cos(c * s +d)), 0.1,0.9);
}  

void main() {

  float rr = random(vUv)/10000.0;
  vec3 modelColor =  sinColorPalette( (vDistance)*30.0*(sin(uTime*0.0)+1.0),  vec3(0.6566,0.234,0.652), vec3(0.2435,0.5674,0.6575), vec3(0.489,0.23434,0.8333), vec3(0.1639,0.2435,0.7625));
  vec3 lighting = vec3(0.0);
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(cameraPosition - vPosition);

  // Ambient
  vec3 ambient = vec3(1.0);

  // Hemi
  vec3 skyColor = vec3(0.0, 0.3, 0.6);
  vec3 groundColor = vec3(0.6, 0.3, 0.1);

  vec3 hemi = mix(groundColor, skyColor, remap(normal.y, -1.0, 1.0, 0.0, 1.0));

  // Diffuse lighting
  vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
  vec3 lightColor = vec3(1.0, 1.0, 0.9);
  float dp = max(0.0, dot(lightDir, normal));

  vec3 diffuse = dp * lightColor;
  vec3 specular = vec3(0.0);

  // Specular
  vec3 r = normalize(reflect(-lightDir, normal));
  float phongValue = max(0.0, dot(viewDir, r));
  phongValue = pow(phongValue, 32.0);

  specular += phongValue * 10.15;

  

  // Fresnel

  float fresnel = max(0.0, dot(viewDir, normal));
  float transparent = fresnel;
  fresnel = pow(fresnel, 8.0);
  transparent = smoothstep(0.1,1.0, fresnel);

  specular *= fresnel;

  // Combine lighting
  lighting = hemi * 0.1 + diffuse;

  vec3 color = modelColor * lighting + specular;

  gl_FragColor = vec4(pow(color, vec3(1.0 / 2.2)), 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;
