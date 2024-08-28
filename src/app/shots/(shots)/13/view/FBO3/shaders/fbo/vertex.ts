export default /*glsl */ `
#define PI 3.1415926535897932384626433832795

varying vec3 vPosition;
varying vec3 vColor;
uniform float uTime;
uniform sampler2D uPositions;


void main() {
  vec3 pos = texture2D(uPositions, position.xy).xyz;

  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  vColor = vec3(0.0,0.0,0.0);
  gl_PointSize = 10.0;

  gl_PointSize *= ( step( 1. - ( 1. / 512. ), position.x ) ) +0.5;


}`;
