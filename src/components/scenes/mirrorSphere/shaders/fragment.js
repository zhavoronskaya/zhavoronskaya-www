export default /*glsl */ `
uniform samplerCube specMap;

uniform float uTime;
varying vec2 vUv;
varying float vDisplacement;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vColor;


vec3 sinColorPalette(float s, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * sin(c * s - d);
}  

float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}

void main() {
  vec3 modelColour =  vColor;
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
  vec3 groundColour = vec3(0.6, 0.4, 0.1);

  vec3 hemi = mix(groundColour, skyColour, remap(normal.y, -1.0, 1.0, 0.0, 1.0));

  // Diffuse lighting
  vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
  vec3 lightColour = vec3(1.0, 0.98, 0.87);
  float dp = max(0.0, dot(lightDir, normal));

  vec3 diffuse = dp * lightColour;
  vec3 specular = vec3(0.0);

  // Specular
  vec3 r = normalize(reflect(-lightDir, normal));
  float phongValue = max(0.0, dot(viewDir, r));
  phongValue = pow(phongValue, 10.0);

  specular += phongValue ;

    // IBL Specular
  vec3 iblCoord = normalize(reflect(-viewDir, normal));
  vec3 iblSample = textureCube(specMap, iblCoord).xyz;

  //refract
  vec3 refCoord = normalize(refract(-viewDir, lightDir, 0.7));
  vec3 refSample = textureCube(specMap, refCoord).xyz;

  specular += iblSample;

  specular += refSample;

  // Fresnel
  float fresnel = 1.0 - max(0.0, dot(viewDir, normal));
  float transparent = fresnel;
  fresnel = pow(fresnel, 0.3);
  transparent = smoothstep(0.7,1.0, fresnel);

 

  specular *= fresnel;

  // Combine lighting
  lighting = hemi * 0.1 + diffuse;

  vec3 colour = modelColour * lighting + specular;

  gl_FragColor = vec4(pow(colour, vec3(1.0 / 2.2)), transparent);



}`;
