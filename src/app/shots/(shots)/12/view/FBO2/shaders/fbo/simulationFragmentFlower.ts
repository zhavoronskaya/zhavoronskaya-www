export default /*glsl */ `

#define PI 3.1415926538;

uniform sampler2D positionsA;
uniform sampler2D positions;
uniform float uTime;

varying vec2 vUv;


float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}

mat3 rotationMatrix3(vec3 axis, float angle)
{
  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1.0 - c;

  return mat3(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,
  oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,
  oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c);
}


void main() {
  
  float time = abs(sin(uTime * 0.335));
  vec3 flower = texture2D(positions, vUv).rgb;

  vec3 flowerCurl= flower;
  vec3 normal = normalize(flowerCurl);

  float t = (sin(flowerCurl.y + uTime * 0.1)*cos(flowerCurl.z*flowerCurl.x*10.0 + uTime * 0.1));
  t = remap(t, -1.0, 1.0, 0.0, 0.15);
  flowerCurl += normal * t;

  flower *=rotationMatrix3(vec3(0.0,1.0,0.0), uTime*0.2);
  flowerCurl *= rotationMatrix3(vec3(0.0,1.0,0.0), uTime*0.2);


  vec3 color = vec3(0.0);
  color = mix(flower, flowerCurl, smoothstep(0.0,1.0,time));


  gl_FragColor = vec4(color,1.0);

}
 
`;
