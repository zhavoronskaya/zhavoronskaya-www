export default /*glsl */ `varying vec2 vUv;
varying vec3 vPosition;
uniform float uTime;

mat2 get2dRotateMatrix(float _angle)
            {
                return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
            }

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    // float angle = (position.y + uTime) * 0.1;
    //     mat2 rotateMatrix = get2dRotateMatrix(angle);

    //     modelPosition.xz = rotateMatrix * modelPosition.xz;
    // modelPosition.xyz += normal*sin(uTime);

//     const float k = 0.1; // or some other amount
//     float c = cos(k*modelPosition.z+uTime);
//     float s = sin(k*modelPosition.z+uTime);
//     mat2  m = mat2(c,-s,s,c);
//     vec3  q = vec3(m*modelPosition.xy,modelPosition.z);
//    modelPosition.xyz += q;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    vUv = uv;
    vPosition = modelPosition.xyz;
} `;
