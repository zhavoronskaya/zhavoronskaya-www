// eslint-disable-next-line import/no-anonymous-default-export
export default /*glsl */ `

varying vec2 vUv;
varying vec3 vPosition;


void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    vUv = uv;
}
`;
