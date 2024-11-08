export default /*glsl */ `
varying vec2 vUv;

uniform vec2 uResolution;
uniform float uTime;
uniform float uAvg;

float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}

// The MIT License
// Copyright © 2013 Inigo Quilez
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
// https://www.youtube.com/c/InigoQuilez
// https://iquilezles.org/
//
// https://www.shadertoy.com/view/Xsl3Dl
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

float ridgedFBM(vec3 p, int octaves, float persistence, float lacunarity) {
  float amplitude = 0.5;
  float frequency = 1.0;
  float total = 0.0;
  float normalization = 0.0;

  for (int i = 0; i < octaves; ++i) {
    float noiseValue = noise(p * frequency);
    noiseValue = abs(noiseValue);
    noiseValue = 1.0 - noiseValue;

    total += noiseValue * amplitude;
    normalization += amplitude;
    amplitude *= persistence;
    frequency *= lacunarity;
  }

  total /= normalization;
  total *= total;

  return total;
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

float cellular(vec3 coords) {
  vec2 gridBasePosition = floor(coords.xy);
  vec2 gridCoordOffset = fract(coords.xy);

  float closest = 1.0;
  for (float y = -2.0; y <= 2.0; y += 1.0) {
    for (float x = -2.0; x <= 2.0; x += 1.0) {
      vec2 neighbourCellPosition = vec2(x, y);
      vec2 cellWorldPosition = gridBasePosition + neighbourCellPosition;
      vec2 cellOffset = vec2(
        noise(vec3(cellWorldPosition, coords.z) + vec3(243.432, 324.235, 0.0)),
        noise(vec3(cellWorldPosition, coords.z))
      );

      float distToNeighbour = length(
          neighbourCellPosition + cellOffset - gridCoordOffset);
      closest = min(closest, distToNeighbour);
    }
  }

  return closest;
}

float stepped(float noiseSample) {
  float steppedSample = floor(noiseSample * 10.0) / 10.0;
  float remainder = fract(noiseSample * 10.0);
  steppedSample = (steppedSample - remainder) * 0.5 + 0.5;
  return steppedSample;
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

float random(vec2 st)
{
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
  float t = (mod(uTime,uAvg));

  vec3 coords = vec3((vUv-0.5) * (4.0),0.0);
  float noiseSample = 0.0;


  // noiseSample = remap(noise(coords), -1.0, 1.0, 0.0, 1.0);
  // noiseSample = remap(fbm(coords, 16, 0.5, 2.0), -1.0, 1.0, 0.0, 1.0);
  float noiseSample1 = turbulenceFBM(vec3(coords.xy, uTime), 4, 0.5, 2.0);
  vec3 offset = vec3(noiseSample1);
  vec3 displaced = coords*vec3(noiseSample1);
noiseSample = domainWarpingFBM(displaced);
vec3 color = vec3(noiseSample);

  //  noiseSample = remap(
  //    noiseSample, -1.0, 1.0, 0.0, 100.0);
  // noiseSample = 1.0 - cellular(coords);
  // noiseSample = stepped(noiseSample);
  // noiseSample = remap(
  //     domainWarpingFBM(coords1), -1.0, 1.0, 0.0, 1.0);

  // vec3 displaced = coords + (noiseSample1);
  // // float dd = 1.0 -max(0.0, (dot(displaced,displaced)));
  // float dd = domainWarpingFBM(displaced)*2.0;
  // coords *= dd;
  // noiseSample = domainWarpingFBM(coords);
  // noiseSample = stepped(noiseSample);
  vec3 pixel = vec3(0.01 / uResolution, 0.0);

  float s1 = domainWarpingFBM(displaced + pixel.xzz);
  float s2 = domainWarpingFBM(displaced - pixel.xzz);
  float s3 = domainWarpingFBM(displaced + pixel.zyz);
  float s4 = domainWarpingFBM(displaced - pixel.zyz);
  vec3 normal = normalize(vec3(s1 - s2, s3 - s4, 0.4));



  // Diffuse lighting
  vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
  vec3 lightColor = vec3(1.0, 1.0, 0.9);
  float dp = max(0.0, dot(lightDir, normal));

  vec3 diffuse = dp * lightColor;
  vec3 specular = vec3(0.0);

  // Specular
  vec3 r = normalize(reflect(-lightDir, normal));
  float phongValue =  max(0.0, dot(vec3(0.0, 0.0, 1.0), r));
  phongValue = pow(phongValue, 64.0);

  specular += phongValue;


  vec3 baseColor = mix(
    vec3(0.17, 0.56, 0.725),
    vec3(0.147, 0.678, uAvg/120.0), smoothstep(0.0, 0.1, noiseSample));
    baseColor = mix(vec3(uAvg/120.0, 0.7856, 0.76525),
    baseColor, smoothstep(0.3, 0.9,  1.0 - noiseSample));
  vec3 lighting = diffuse;
  vec3 color2 = vec3(0.147, uAvg/130.0, uAvg/130.0);
  // baseColor = mix(color2,
  //   baseColor, smoothstep(0.1, 0.15,  1.0 -noiseSample1));

  color = baseColor * lighting + specular;
  // color = baseColor;
  color = pow(color, vec3(1.0 / 0.9));

  gl_FragColor = vec4(color,1.0);
}`;
