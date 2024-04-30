export default /*glsl */ `

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

uniform float uTime;


float random2D(vec2 value)
{
    return fract(sin(dot(value.xy, vec2(12.9898,78.233))) * 43758.5453123);
}


void main()
{
    vec3 newPosition = position;




    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);


    //glitchStrength
    float glitchTime = uTime- modelPosition.y;
    float glitchStrength = sin(glitchTime) + sin(glitchTime*2.2) + sin(glitchTime*4.8);
    //remap from -1 to 1
    glitchStrength/=3.0;

    glitchStrength = smoothstep(0.2,1.0,glitchStrength);
    glitchStrength *=0.05;
    modelPosition.x += (random2D(modelPosition.xz + uTime)-0.5)*glitchStrength;
    modelPosition.z += (random2D(modelPosition.zx + uTime)-0.5)*glitchStrength;


    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;
    vPosition = modelPosition.xyz;
    vUv = uv;
    vNormal = (modelMatrix*vec4(normal,0)).xyz;
} `;
