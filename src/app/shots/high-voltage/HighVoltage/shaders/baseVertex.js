export default /*glsl */ `
#define PI 3.1415926535897932384626433832795


varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vwPosition;
varying vec3 vNormal;


uniform float uTime;





void main()
{

  vec4 modelPosition = modelMatrix * vec4((position), 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;





    gl_Position = projectionPosition;
    vNormal =  normalize(modelPosition.xyz);
    vPosition = modelPosition.xyz;

    vUv = uv;
    vwPosition = vec3(viewPosition.xyz);

    // float cover = .25;
    //   vec3 pos = position.xyz;
    //   vec3 base = vec3(pos.x, pos.y, 0.0);
    //   vec4 baseGP = instanceMatrix * vec4(base, 1.0);
    //   v_pos = baseGP.xyz;
    //   vec2 noise = (lamina_noise_curl(baseGP.xyz * vec3(0.1) + u_time * 0.5 * u_sway)).xy;
    //   noise = smoothstep(-1.0, 1.0, noise);
    //   float swingX = sin( 2.0 + noise.x * 2.0 * PI) * pow(pos.z, 2.0);
    //   float swingY = cos(2.0 + noise.y * 2.0 * PI) * pow(pos.z, 2.0);
    //   float d = distance(u_spherePos, baseGP.xyz);
    //   float radius = 0.75;
    //   float intensity = (1. - min(d, radius) / radius) * 0.5;
    //   pos.x += swingX + intensity;
    //   pos.y += swingY + intensity;
    //   return (pos * u_length);



} `;
