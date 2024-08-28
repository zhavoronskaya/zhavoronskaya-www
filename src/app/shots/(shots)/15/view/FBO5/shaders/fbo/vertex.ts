export default /*glsl */ `
#define PI 3.1415926535897932384626433832795



varying vec3 vColor;
uniform float uTime;

varying vec3 vPosition;

uniform sampler2D uPositions;


void main() {
  vec3 pos = texture2D(uPositions, position.xy).xyz;

  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
  // vColor = mix (vec3(0.1,0.0,0.1), vec3(0.0,0.0,0.0), smoothstep(0.,1.0,length(pos)));
  vColor = vec3(1./255.0, 1.0/255.0, 1.0/255.0); 
  gl_PointSize = 50.0;

  gl_PointSize *= (1.0 / - viewPosition.z);

}`;
