export default /*glsl */ `

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
uniform float uTime;




void main()
{

    
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    vNormal = (modelMatrix*vec4(normal,0.0)).xyz;
    vPosition = modelPosition.xyz;
    vUv = uv;
} `;
