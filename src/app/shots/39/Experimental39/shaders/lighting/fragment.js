export default /*glsl */ `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

uniform vec2 uResolution;
uniform float uTime;


vec3 ambientLight(vec3 lightColor, float lightIntensity)
{
    return lightColor * lightIntensity;
}

vec3 directionalLight(vec3 lightColor, float lightIntensity, vec3 normal, vec3 lightPosition, vec3 viewDirection, float specularPower)
{
    vec3 lightDirection = normalize(lightPosition);
    vec3 lightReflection = reflect(- lightDirection, normal);

    // Shading
    float shading = dot(normal, lightDirection);
    shading = max(0.0, shading);

    // Specular
    float specular = - dot(lightReflection, viewDirection);
    specular = max(0.0, specular);
    specular = pow(specular, specularPower);

    return lightColor * lightIntensity * (shading + specular);
}

vec3 pointLight(vec3 lightColor, float lightIntensity, vec3 normal, vec3 lightPosition, vec3 viewDirection, float specularPower, vec3 position, float lightDecay)
{
    vec3 lightDelta = lightPosition - position;
    float lightDistance = length(lightDelta);
    vec3 lightDirection = normalize(lightDelta);
    vec3 lightReflection = reflect(- lightDirection, normal);

    // Shading
    float shading = dot(normal, lightDirection);
    shading = max(0.0, shading);

    // Specular
    float specular = - dot(lightReflection, viewDirection);
    specular = max(0.0, specular);
    specular = pow(specular, specularPower);

    // Decay
    float decay = 1.0 - lightDistance * lightDecay;
    decay = max(0.0, decay);

    return lightColor * lightIntensity * decay * (shading + specular);
}


float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}


void main() {

  vec3 color = vec3(0.2);

  vec3 normal = normalize(vNormal);
  vec3 viewDirection = normalize(vPosition - cameraPosition);
  //light
  vec3 light = vec3(0.0);
  // light +=ambientLight(
  //   vec3(0.67,0.23,0.78),// Light color 
  //  0.2 // Light intensity
  //  );

  //  light += directionalLight(
  //   vec3(0.87,0.23,0.18),// Light color 
  //   1.0, // Light intensity
  //   normal,              // Normal
  //   vec3(0.0, 30.0, 3.0), // Light position
  //   viewDirection,       // View direction
  //   20.0                 // Specular power
  //  );

   light += pointLight(
    vec3(0.87,0.23,0.18),// Light color 
    1.0, // Light intensity
    normal,              // Normal
    vec3(0.0, 4.0, 3.0), // Light position
    viewDirection,       // View direction
    20.0,                // Specular power
    vPosition,           // Position
    0.25                 // Light decay
   );

  color *=light;
  gl_FragColor = vec4(color, 1.0);

  #include <tonemapping_fragment>
    #include <colorspace_fragment>
}`;
