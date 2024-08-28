export default /*glsl */ `
#define PI 3.1415926535897932384626433832795

uniform float uTime;
uniform sampler2D uPositions;
varying vec3 vColor;

void main() {
  
  vec3 pos = texture2D(uPositions, position.xy).xyz;

  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  vColor = mix(vec3(0.197,0.67,0.81),vec3(0.75197,0.27,0.8431),smoothstep(0.0,2.0,length(pos)));
  //Size
  gl_PointSize = 6.0;
  gl_PointSize *= ( step( 1.0 - ( 1.0/ 64.0), position.x )) + 0.8;

}`;
