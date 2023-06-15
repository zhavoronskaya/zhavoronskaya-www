export default /*glsl */ `

#include <common>
#include <skinning_pars_vertex>
varying vec2 vUv;
varying vec3 vPosition;

varying vec3 vNormal;

uniform float uTime;


void main()
{

      #include <skinbase_vertex>
      #include <begin_vertex>
      #include <beginnormal_vertex>
      #include <defaultnormal_vertex>
      #include <skinning_vertex>
      #include <project_vertex>

      vNormal = normalize(normalMatrix * normal);
     // vPosition = vec3(modelViewMatrix * vec4(position, 1.0));
      gl_Position = projectionMatrix * mvPosition;
     vPosition = mvPosition.xyz;
  // vec4 modelPosition = modelMatrix * vec4(position, 1.0);


  //   vec4 viewPosition = viewMatrix * modelPosition;
  //   vec4 projectionPosition = projectionMatrix * viewPosition;



  //   gl_Position = projectionPosition;
  //   vNormal = normal;
  //   vPosition = modelPosition.xyz;



    vUv = uv;

   
} `;
