export default /*glsl */ `

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vColor;
uniform float uTime;
attribute vec4 tangent;


float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
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

void main() {

  vec3 biTangent = cross(normal, tangent.xyz);

  // Base position
  float shift = 0.01;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec3 modelPositionA = modelPosition.xyz + tangent.xyz*shift;
  vec3 modelPositionB = modelPosition.xyz + biTangent*shift;

  //deformation
  float t = sin(modelPosition.y * 10.0 + uTime * 10.0);
  t = remap(t, -1.0, 1.0, 0.0, 0.6);
  modelPosition.xyz += normal * t;
  float noise = turbulenceFBM(modelPosition.xyz, 4, 0.5, 2.0);
  modelPosition.xyz += normal * noise;


  float elevationA1 = sin(modelPositionA.y * 10.0 + uTime * 10.0);
  elevationA1 = remap(elevationA1, -1.0, 1.0, 0.0, 0.6);
  modelPositionA.xyz += normal * elevationA1;
  float elevationA2 =  turbulenceFBM(modelPositionA.xyz, 4, 0.5, 2.0);
  modelPositionA.xyz += normal * elevationA2;

  float elevationB1 = sin(modelPositionB.y * 10.0 + uTime * 10.0);
  elevationB1 = remap(elevationB1, -1.0, 1.0, 0.0, 0.6);
  modelPositionB.xyz += normal * elevationB1;
  float elevationB2 =  turbulenceFBM(modelPositionB.xyz, 4, 0.5, 2.0);
  modelPositionB.xyz += normal * elevationB2;


vec3 toA = normalize(modelPositionA - modelPosition.xyz);
vec3 toB = normalize(modelPositionB - modelPosition.xyz);

//recalculate normal
vec3 computedNormal = cross(toA, toB);
vNormal = computedNormal;

vPosition = modelPosition.xyz;
vUv= uv;
vColor = mix(
      vec3(0.6788, 0.234, 0.567),
      vec3(0.323, 0.3, 0.878),
      smoothstep(0.0, 0.2, t));

gl_Position = projectionMatrix * viewMatrix *modelPosition;

} `;
