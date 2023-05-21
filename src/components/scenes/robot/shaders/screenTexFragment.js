export default /*glsl */ `
#define PI 3.1415926535897932384626433832795

varying vec2 vUv;
uniform float uTime;
uniform vec2 uResolution;
uniform sampler2D uTex;
uniform sampler2D uTex2;
uniform float uAvg;
uniform float uDuration;



float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}

float sdfCircle(vec2 p, float r) {
    return length(p) - r;
}

vec3 hash( vec3 p ) // replace this by something better
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

float fbm(vec3 p, int octaves, float persistence, float lacunarity) {
  float amplitude = 1.0;
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
  total = smoothstep(-1.0, 1.0, total);

  return total;
}

 


void main() {

 vec2 pixelCoords = (vUv - 0.5) * uResolution;

 vec2 p =  2.0*vUv- 1.0;
  float len = length(p);
  float noiseSample = fbm(vec3(vUv, 0.0) *0.005, 4, 0.5, 2.0);
  vec2 distortion = noiseSample / uResolution;
  float len1 = length(distortion);
  vec2 uvDistortion = distortion * .5 * smoothstep(1.0, 0.0, len)*p/len*cos(len*12.0-uTime*10.0)*0.03;
  vec2 uvRipple = vUv +  p/len*cos(len*12.0-uTime*10.0)*0.03;
  float delta =1.0- uTime/uDuration;
  vec2 uv = mix(vUv,uvRipple, delta);
  vec4 sample1 = texture2D(uTex, uv);
  vec4 sample2 = texture2D(uTex2, uv);

  float fade = smoothstep(delta*2.5, delta*1.0, len);
  vec4 color = mix(sample1, sample2, fade);
  gl_FragColor = vec4(color); 

}`;
