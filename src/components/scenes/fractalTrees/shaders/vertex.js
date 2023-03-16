export default /*glsl */ `
#define PI 3.1415926535897932384626433832795




void main() {

//Position
vec4 modelPosition = modelMatrix * vec4(position, 1.0);
vec4 viewPosition = viewMatrix * modelPosition;
vec4 projectedPosition = projectionMatrix * viewPosition;
gl_Position = projectedPosition;


}`;
