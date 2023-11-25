export default /*glsl */ `



varying vec2 vUv;
varying vec3 vPosition;

varying vec3 vNormal;


uniform float uTime;


#include <common>
#include <skinning_pars_vertex>


void main()
{

      #include <skinbase_vertex>
      #include <begin_vertex>
      #include <beginnormal_vertex>
      #include <defaultnormal_vertex>
      #include <skinning_vertex>
      #include <project_vertex>
      
    vec4 modelPosition = modelMatrix * vec4((position), 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;




    gl_Position = projectionMatrix * mvPosition;
    vNormal = normalize(normalMatrix * normal);
    vPosition = vec3(mvPosition.xyz);

    vUv = uv;
  


} `;
