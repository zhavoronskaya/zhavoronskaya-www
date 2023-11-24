export default /*glsl */ `
uniform float uTime;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;


uniform samplerCube specMap;

float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}


vec3 linearTosRGB(vec3 value ) {
  vec3 lt = vec3(lessThanEqual(value.rgb, vec3(0.0031308)));
  
  vec3 v1 = value * 12.92;
  vec3 v2 = pow(value.xyz, vec3(0.41666)) * 1.055 - vec3(0.055);

	return mix(v2, v1, lt);
}

void main() {
  vec3 modelColor = vec3(0.16,0.009,0.8);
  vec3 lighting = vec3(0.0);

  vec3 normal = normalize(vNormal);
  // vec3 normal = normalize(
  //     cross(
  //         dFdx(vec3(vPosition)),
  //         dFdy(vec3(vPosition))));
  vec3 viewDir = normalize(cameraPosition - vPosition);

  // Ambient
  vec3 ambient = vec3(1.0);

  // Hemi
  vec3 skyColor = vec3(0.0, 0.6, 0.8);
  vec3 groundColor = vec3(0.7, 0.3, 0.4);

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
  phongValue = pow(phongValue, 64.0);

  specular += phongValue * 0.5;
    // IBL Specular
    vec3 iblCoord = normalize(reflect(-viewDir, normal));
  vec3 iblSample = textureCube(specMap, iblCoord).xyz;

  specular += 0.5*iblSample;

  // Fresnel
  float fresnel = 1.0 - max(0.0, dot(viewDir, normal));
  fresnel = pow(fresnel, 2.0);


  specular *= fresnel;

  // Combine lighting
  lighting = hemi * 0.1 + diffuse;

  vec3 color = modelColor * lighting + specular;


//    color = linearTosRGB(color);

  gl_FragColor = vec4(pow(color, vec3(1.0 / 2.2)), 1.0);

   // gl_FragColor = vec4(vec3(1.0,0.0,1.0), 1.0);
}`;
