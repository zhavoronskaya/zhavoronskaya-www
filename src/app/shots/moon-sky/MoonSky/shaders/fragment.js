export default /*glsl */ `
varying vec2 vUv;

uniform float uTime;
uniform vec2 uResolution;

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

float turbulenceFBM(vec3 p, int octaves, float persistence, float lacunarity) {
  float amplitude = 0.5;
  float frequency = 1.0;
  float total = 0.0;
  float normalization = 0.0;

  for (int i = 0; i < octaves; ++i) {
    float noiseValue = noise(p * frequency);
    noiseValue = abs(noiseValue);

    total += noiseValue * amplitude;
    normalization += amplitude;
    amplitude *= persistence;
    frequency *= lacunarity;
  }

  total /= normalization;

  return total;
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

//Create Background
vec3 DrawBackground(vec3 coord) {

  float tb = turbulenceFBM(vec3(coord), 10, 0.5,2.0);
  float tboff = turbulenceFBM(vec3(coord)* 0.5-vec3(10.0), 15, 0.5, 2.0);

vec3 color = mix( vec3(0.07, 0.1, 0.19),
    vec3(0.55, 0.552, 0.578),
    smoothstep(0.05, 0.98,  tb));
color = mix(vec3(0.67,0.74,0.88), color, smoothstep(-.5, 0.1,tboff));
color=mix(vec3(0.68,0.32,0.85), color, smoothstep(0.0, 0.22, tb));  

return color;

}


//Create a Moon
float opSubtraction(float d1, float d2) {
  return max(-d1, d2);
}

float sdfCircle(vec2 p, float r) {
    return length(p) - r;
}

float sdfMoon(vec2 pixelCoords) {
  float d = opSubtraction(
      sdfCircle(pixelCoords + vec2(30.0, 0.0), 80.0),
      sdfCircle(pixelCoords, 80.0));
  return d;
}

mat2 rotate2D(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}


float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}


vec3 GenerateGridStars(
    vec2 pixelCoords, float starRadius, float cellWidth,
    float seed, bool twinkle) {
  vec2 cellCoords = (fract(pixelCoords / cellWidth) - 0.5) * cellWidth;
  vec2 cellID = floor(pixelCoords / cellWidth) + seed / 100.0;
  vec3 cellHashValue = hash(vec3(cellID, uTime*0.5));

  float starBrightness = saturate(cellHashValue.z);
  vec2 starPosition = vec2(0.0);
  starPosition += cellHashValue.xy * (cellWidth * 0.5 - starRadius * 4.0);
  float distToStar = length(cellCoords - starPosition);
  // float glow = smoothstep(starRadius + 1.0, starRadius, distToStar);
  float glow = exp(-2.0 * distToStar / starRadius);

  if (twinkle) {
    float noiseSample = noise(vec3(cellID, uTime * 1.5));
    float twinkleSize = (
        remap(noiseSample, -1.0, 1.0, 1.0, 0.1) * starRadius * 6.0);
    vec2 absDist = abs(cellCoords - starPosition);
    float twinkleValue = smoothstep(starRadius * 0.25, 0.0, absDist.y) *
        smoothstep(twinkleSize, 0.0, absDist.x);
    twinkleValue += smoothstep(starRadius * 0.25, 0.0, absDist.x) *
        smoothstep(twinkleSize, 0.0, absDist.y);
    glow += twinkleValue;
  }

  return vec3(glow * starBrightness);
}

vec3 GenerateStars(vec2 pixelCoords) {
  vec3 stars = vec3(0.0);

  float size = 8.0;
  float cellWidth = 600.0;
  for (float i = 0.0; i <= 2.0; i++) {
    stars += GenerateGridStars(pixelCoords, size, cellWidth, i, true);
    size *= 0.5;
    cellWidth *= 0.35;
  }

  for (float i = 3.0; i < 5.0; i++) {
    stars += GenerateGridStars(pixelCoords, size, cellWidth, i, false);
    size *= 0.5;
    cellWidth *= 0.35;
  }

  return stars;
}

void main() {

    
    vec3 pixelCoords = vec3((vUv)*uResolution, uTime*0.2);
    vec2 offset = uResolution * 5.8;
    vec3 color = GenerateStars(vUv*uResolution*vec2(1000.0));
    color += DrawBackground(pixelCoords);
    color += DrawBackground(pixelCoords- vec3(offset.x, offset.y, (sin(uTime))));
  
    vec2 moonPos = ((vUv)-0.5)*uResolution *vec2(1000.0);
    moonPos = rotate2D(3.14159 * -0.2) * moonPos;
    float moon = sdfMoon(moonPos);

    color = mix(vec3(0.980), color, smoothstep(0.0, 2.0, moon));

    float moonGlow = sdfMoon(moonPos);
    color += 1.9 * mix(vec3(1.0), vec3(0.0), smoothstep(-10.0,15.0, moonGlow));
   
   

    gl_FragColor = vec4(color,1.0);
}`;
