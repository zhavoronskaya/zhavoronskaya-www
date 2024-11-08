//Recompute normals


//in THREE.js we need tangent, indexed model!!!
//for indexing follow:
//import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js'
//geometry = mergeVertices(geometry)
////geometry.computeTangents() in THREE.js
//...
varying vec3 vNormal;
attribute vec4 tangent;

void main()
{
//...

//calculate bitangent
 vec3 biTangent = cross(normal, tangent.xyz);


  // Base position
    float shift = 0.01;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec3 modelPositionA = modelPosition.xyz +tangent*shift;
    //For right hand direction - z!
    vec3 modelPositionB = modelPosition.xyz + biTangent*shift;

    //Make deformation, for example elevation
    float elevation = someElevation(modelPosition.xyz);
    modelPosition.xyz += elevation * normal;;


    float elevationA = someElevation(modelPositionA.xyz);
    float elevationB = someElevation(modelPositionB.xyz);
    modelPositionA.xyz += elevationA * normal;
    modelPositionB.xyz += elevationB * normal;

    //
    vec3 toA = normalize(modelPositionA - modelPosition.xyz);
    vec3 toB = normalize(modelPositionB - modelPosition.xyz);

    //recalculate normal
    vec3 computedNormal = cross(toA, toB);
    vec3 vNormal = computedNormal;
    // ...
}