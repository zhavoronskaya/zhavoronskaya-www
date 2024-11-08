export default /*glsl */ `
varying vec2 vUv;
varying vec3 vNormal;

uniform vec2 uResolution;
uniform float uTime;




float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}


vec3 halftone(
    vec3 color,
    float repetitions,
    vec3 direction,
    float low,
    float high,
    vec3 pointColor,
    vec3 normal
)
{
    float intensity = dot(normal, direction);
    intensity = smoothstep(low, high, intensity);

    vec2 uv = gl_FragCoord.xy / uResolution.y;
    uv *= repetitions;
    uv = mod(uv, 1.0);

    float point = distance(uv, vec2(0.5));
    point = 1.0 - step(0.5 * intensity, point);

   return mix(color, pointColor, point);
}

void main() {

  vec3 normal = vNormal;
  // uv across whole render, not moving and transform gl_FragCoord.xy
  vec2 uv = gl_FragCoord.xy / uResolution.y;

  
  // // Halftone
  // float repetitions = 40.0;
  // //dirrection of halfrone, shadow under objects
  // vec3 direction = vec3(0.0, -1.0, 0.0);
  // //control intensity 
  // float low = - 0.8;
  //   float high = 1.5;

  // float intensity = dot(direction,normal);
  // intensity = smoothstep(low,high, intensity);

  // //create grid
  // uv *= repetitions;
  // uv = mod(uv,1.0);

  // float point = length(uv-0.5);
  // point = 1.0 - step(0.5*intensity,point);
vec3 color = vec3(0.0);
    // Halftone
    color = halftone(
        color,                 // Input color
        50.0,                  // Repetitions
        vec3(0.0, - 1.0, 0.0), // Direction
        - 0.8,                 // Low
        1.5,                   // High
        vec3(1.0, 1.0, 1.0),   // Point color
        normal                 // Normal
    );

  gl_FragColor = vec4(color, 1.0);

  #include <tonemapping_fragment>
    #include <colorspace_fragment>
}`;
