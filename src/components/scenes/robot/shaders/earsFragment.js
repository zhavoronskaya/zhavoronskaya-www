export default /*glsl */ `
#define PI 3.1415926535897932384626433832795
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vwPosition;
varying vec3 vNormal;
varying float vNoise;

uniform float uTime;
uniform vec2 uImpulse;
uniform float uSpikeCount;
uniform float uSpikeLength;
uniform float uSceneRotationY;

float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}


void main() {
  vec3 modelColour = vec3(0.8,0.3,0.796);
  vec3 lighting = vec3(0.0);


  // vec3 normal = normalize(vNormal);
  vec3 normal = normalize(
      cross(
          dFdx(vec3(vPosition)),
          dFdy(vec3(vPosition))));
  vec3 viewDir = normalize(cameraPosition - vPosition);

  // Ambient
  vec3 ambient = vec3(1.0);

  // Hemi
  vec3 skyColour = vec3(0.0, 0.3, 0.6);
  vec3 groundColour = vec3(0.6, 0.3, 0.1);

  vec3 hemi = mix(groundColour, skyColour, remap(normal.y, -1.0, 1.0, 0.0, 1.0));

  // Diffuse lighting
  vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
  vec3 lightColour = vec3(1.0, 1.0, 0.9);
  float dp = max(0.0, dot(lightDir, normal));

  vec3 diffuse = dp * lightColour;
  vec3 specular = vec3(0.0);

  // Specular
  vec3 r = normalize(reflect(-lightDir, normal));
  float phongValue = max(0.0, dot(viewDir, r));
  phongValue = pow(phongValue, 64.0);

  specular += phongValue * 0.015;


  // Fresnel
  float fresnel = 1.0 - max(0.0, dot(viewDir, normal));
  fresnel = pow(fresnel, 2.0);

  specular *= fresnel*0.1;

  // Combine lighting
  lighting = hemi * 0.1 + diffuse;

  vec3 colour = modelColour * lighting + specular;
// 
  gl_FragColor = vec4(pow(colour, vec3(1.0 / 2.2)), 1.0);
  //gl_FragColor = vec4(vec3(abs(vPosition.y-3.0)), 1.0);
}`;
