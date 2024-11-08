export default /*glsl */ `
varying vec2 vUv;

uniform vec2 uResolution;
uniform float uTime;

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

float opUnion(float d1, float d2) {
  return min(d1, d2);
}

float opSubtraction(float d1, float d2) {
  return max(-d1, d2);
}

float opIntersection(float d1, float d2) {
  return max(d1, d2);
}

vec2 rotate(vec2 uv, float rotation, vec2 mid)
  {
      return vec2(
        cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
        cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
      );
  }

  float sdfCircle(vec2 p, float r) {
    return length(p) - r;
}

void main() {
  vec3 coords = vec3(vUv, uTime*10.0 ) ;

  // vec2 wavedUv = vec2(
  //   mod(vUv.x + sin(vUv.y * 30.0) * uTime, uTime),
  //   mod(vUv.y + sin(vUv.x * 30.0) * uTime, uTime)
  //     );
  float noiseSample = 0.0;

  noiseSample = ridgedFBM(vec3(vUv*10.0,uTime*10.0), 4, 0.5, 2.0);
  // vec3 wavedUv = vec3((vUv.x-0.5)*noiseSample,  (vUv.y-0.5)*noiseSample, uTime);
  // float d = sdfCircle(vUv-vec2(0.5), 0.1);
  vec2 wavedUv = vec2(
    (coords.x +(sin(coords.y * 100.0)*cos(coords.x * 100.0))*noiseSample+(cos(coords.y * 100.0)*sin(coords.x * 100.0))*(1.0 - noiseSample)) ,
    (coords.y +(sin(coords.x * 100.0)*cos(coords.y * 100.0))*noiseSample+(cos(coords.x * 100.0)*sin(coords.y * 100.0))*(1.0 - noiseSample))
);
// vec2 gridUv = vec2(floor(vUv.x * 10.0) / 10.0, floor(vUv.y * 10.0) / 10.0);
float d = (sdfCircle(wavedUv-vec2(0.5), 1.0 - noiseSample));
// d *= 0.15 / (distance(vec2(gridUv.x, (gridUv.y - 0.5) * 5.0 + 0.5), vec2(0.5)));
// wavedUv = rotate(wavedUv, uTime, vec2(0.5));

float strength = 1.0 - smoothstep(0.0,0.1, abs(distance(wavedUv, vec2(0.1)) - 0.25));
strength *= 0.55 / (distance(vec2(vUv.y, (vUv.x - 0.5) * 5.0 + 0.5), vec2(0.5)));
  // strength = opIntersection(strength, d);
//   float strength = 0.15 / (distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0 + 0.5), vec2(0.5)));
// strength *= 0.15 / (distance(vec2(vUv.y, (vUv.x - 0.5) * 5.0 + 0.5), vec2(0.5)));



  // float strength = step(0.5, dist);
    // strength = step(min(max(0.1 ,dist) , 0.9), strength);
  // noiseSample = remap(noise(coords), -1.0, 1.0, 0.0, 1.0);
  // noiseSample = remap(fbm(coords, 16, 0.5, 2.0), -1.0, 1.0, 0.0, 1.0);


  // noiseSample1 = turbulenceFBM(coords, 4, 0.5, 2.0);
 
  // float noise = opSubtraction(dist );
  //  noiseSample = remap(
  //    noiseSample, -1.0, 1.0, 0.0, 100.0);
  // noiseSample = 1.0 - cellular(coords);
  // noiseSample = stepped(noiseSample);
  // noiseSample = remap(
  //     domainWarpingFBM(coords1), -1.0, 1.0, 0.0, 1.0);

  vec3 color = vec3(0.0);

  vec3 pixel = vec3(0.005 / uResolution, 0.0);

   float s1 = 1.0 - smoothstep(0.0,0.03, abs(distance(wavedUv + pixel.xz, vec2(0.1)) - 0.25));
  float s2 = 1.0 - smoothstep(0.0,0.03, abs(distance(wavedUv - pixel.xz, vec2(0.1)) - 0.25));
  float s3 = 1.0 - smoothstep(0.0,0.03, abs(distance(wavedUv + pixel.zy, vec2(0.1)) - 0.25));
  float s4 = 1.0 - smoothstep(0.0,0.03, abs(distance(wavedUv - pixel.zy, vec2(0.1)) - 0.25));
  // float s1 = ridgedFBM(coords + pixel.xzz, 4, 0.5, 2.0);
  // float s2 = ridgedFBM(coords - pixel.xzz, 4, 0.5, 2.0);
  // float s3 = ridgedFBM(coords + pixel.zyz, 4, 0.5, 2.0);
  // float s4 = ridgedFBM(coords - pixel.zyz, 4, 0.5, 2.0);
  vec3 normal = normalize(vec3(s1 - s2, s3 - s4, 0.5));

  // Hemi
  vec3 skyColor = vec3(0.0, 0.3, 0.4);
  vec3 groundColor = vec3(0.2, 0.3, 0.87);

  vec3 hemi = mix(groundColor, skyColor, remap(normal.y, -1.0, 1.0, 0.0, 1.0));

  // Diffuse lighting
  vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
  vec3 lightColor = vec3(1.0, 1.0, 0.9);
  float dp = max(0.0, dot(lightDir, normal));

  vec3 diffuse = dp * lightColor;
  vec3 specular = vec3(0.0);

  // Specular
  vec3 r = normalize(reflect(-lightDir, normal));
  float phongValue =max(0.0, dot(vec3(0.0, 0.0, 1.0), r));
  phongValue = pow(phongValue, 64.0);

  specular += phongValue;


  vec3 baseColor = mix(
    vec3(0.01, 0.01, 0.01),
    vec3(0.147, 0.56, 0.495), strength);
    // baseColor = mix(vec3(0.347, 0.2, 0.725),
    // baseColor, smoothstep(0.0, 0.9,  dist*dist));
  vec3 lighting = diffuse;

  color = baseColor*lighting + specular ;
  // color = baseColor;
  color = pow(color, vec3(1.0 / 1.9));

  gl_FragColor = vec4(vec3(color), 1.0);
}`;
