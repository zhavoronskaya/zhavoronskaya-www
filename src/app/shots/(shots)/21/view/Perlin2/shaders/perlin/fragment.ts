export default /*glsl */ `


uniform float uTime;
varying vec2 vUv;
varying float vDisplacement;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vColor;


vec3 cosPalette(  float t,  vec3 a,  vec3 b,  vec3 c, vec3 d ){
    return a + b*cos( 6.28318*(c*t+d) );
}

float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}


void main() {
  vec3 modelColor =mix(  vec3(0.16, 0.4, 0.86) ,
  vec3(0.1, 0.1, 0.99), vDisplacement); 
 modelColor = cosPalette(vDisplacement,modelColor, vec3(0.6,0.9,0.2),vec3(0.6,0.8,0.7),vec3(0.5,0.1,0.0));
 modelColor=clamp(modelColor,vec3(0.2),vec3(1.0));
  vec3 lighting = vec3(0.0);
  vec3 normal = normalize(vNormal);

  vec3 viewDir = normalize(cameraPosition - vPosition);

  // Ambient
  vec3 ambient = vec3(1.0);

  // Hemi
  vec3 skyColor = vec3(0.0, 0.3, 0.76);
  vec3 groundColor = vec3(0.54, 0.33, 0.1);

  vec3 hemi = mix(groundColor, skyColor, remap(normal.z, -1.0, 1.0, 0.0, 1.0));

  // Diffuse lighting
  vec3 lightDir = normalize(vec3(0.0, 1.0, 0.0));
  vec3 lightColor = vec3(1.0, 1.0, 0.98);
  float dp = max(0.0, dot(lightDir, normal));

  vec3 diffuse = dp * lightColor;
  vec3 specular = vec3(0.0);

  // Specular
  vec3 r = normalize(reflect(-lightDir, normal));
  float phongValue = max(0.0, dot(viewDir, r));
  phongValue = pow(phongValue, 32.0);

  specular += phongValue;

  // Combine lighting
  lighting = diffuse;

  vec3 color = modelColor * lighting + specular;

  gl_FragColor = vec4(pow(color, vec3(1.0 / 2.0)), 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>

}`;
