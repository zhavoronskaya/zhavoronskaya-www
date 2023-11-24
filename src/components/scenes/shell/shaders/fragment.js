export default /*glsl */ `


uniform float uTime;
varying vec2 vUv;
varying float vDisplacement;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vColor;

vec3 hash( vec3 p ) 
{
	p = vec3( dot(p,vec3(127.1,311.7, 74.7)),
            dot(p,vec3(269.5,183.3,246.1)),
            dot(p,vec3(113.5,271.9,124.6)));

	return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}

float noise( in vec3 p )
{
  vec3 i = floor( p );
  vec3 f = fract( p );
	
	vec3 u = f*f*(3.0-2.0*f);

  return mix( mix( mix( dot( hash( i + vec3(0.0,0.0,0.0) ), f - vec3(0.0,0.0,0.0) ), 
                        dot( hash( i + vec3(1.0,0.0,0.0) ), f - vec3(1.0,0.0,0.0) ), u.x),
                   mix( dot( hash( i + vec3(0.0,1.0,0.0) ), f - vec3(0.0,1.0,0.0) ), 
                        dot( hash( i + vec3(1.0,1.0,0.0) ), f - vec3(1.0,1.0,0.0) ), u.x), u.y),
              mix( mix( dot( hash( i + vec3(0.0,0.0,1.0) ), f - vec3(0.0,0.0,1.0) ), 
                        dot( hash( i + vec3(1.0,0.0,1.0) ), f - vec3(1.0,0.0,1.0) ), u.x),
                   mix( dot( hash( i + vec3(0.0,1.0,1.0) ), f - vec3(0.0,1.0,1.0) ), 
                        dot( hash( i + vec3(1.0,1.0,1.0) ), f - vec3(1.0,1.0,1.0) ), u.x), u.y), u.z );
}


float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}

float fbm(vec3 p, int octaves, float persistence, float lacunarity) {
  float amplitude = 0.5;
  float frequency = 1.0;
  float total = 0.0;
  float normalization = 0.0;

  for (int i = 0; i < octaves; ++i) {
    float noiseValue = noise(p * frequency);
    total += noiseValue * amplitude;
    normalization += amplitude;
    amplitude *= persistence;
    frequency *= lacunarity;
  }

  total /= normalization;

  return total;
}

float domainWarpingFBM(vec3 coords) {
  vec3 offset = vec3(
    fbm(coords, 4, 0.5, 2.0),
    fbm(coords + vec3(43.235, 23.112, 0.0), 4, 0.5, 2.0), 0.0);
  float noiseSample = fbm(coords + offset, 1, 0.5, 2.0);

  vec3 offset2 = vec3(
    fbm(coords + 4.0 * offset + vec3(5.325, 1.421, 3.235), 4, 0.5, 2.0),
    fbm(coords + 4.0 * offset + vec3(4.32, 0.532, 6.324), 4, 0.5, 2.0), 0.0);
  noiseSample = fbm(coords + 4.0 * offset2, 1, 0.5, 2.0);

  return noiseSample;
}



void main() {
  vec3 modelColor =  vColor;
  vec3 coords = vec3(vPosition*1.0);
  float noiseSample = domainWarpingFBM(coords*abs(sin(uTime)));
  modelColor = mix(vec3(0.858,0.56,0.63), modelColor, noiseSample);
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
  phongValue = pow(phongValue, 64.0);

  specular += phongValue * 4.15;


  // Fresnel
  float fresnel = 1.0 - max(0.0, dot(viewDir, normal));
  fresnel = pow(fresnel, 2.0);

  specular *= fresnel;

  // Combine lighting
  lighting = hemi * 0.1 + diffuse;

  vec3 color = modelColor * lighting + specular;

  gl_FragColor = vec4(pow(color, vec3(1.0 / 2.2)), 1.0);
//   float noiseDir =clamp(1.0 - 2.0*(abs(vUv.y)), 0.0,1.0) ;
//  gl_FragColor = vec4(vec3(noiseDir),1.0);

}`;
