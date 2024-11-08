//Recompute normals
//...
varying vec3 vNormal;

void main()
{
//...
  // Base position
    float shift = 0.01;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec3 modelPositionA = modelPosition.xyz + vec3(shift,0,0);
    //For right hand direction - z!
    vec3 modelPositionB = modelPosition.xyz + vec3(0,0,-shift);

    //Make deformation, for example elevation
    float elevation = someElevation(modelPosition.xyz);
    modelPosition.y += elevation;


    float elevationA= someElevation(modelPositionA.xyz);
    float elevationB= someElevation(modelPositionB.xyz);
    modelPositionA.y += elevationA;
    modelPositionB.y += elevationB;

    //
    vec3 toA = normalize(modelPositionA - modelPosition.xyz);
    vec3 toB = normalize(modelPositionB - modelPosition.xyz);

    //recalculate normal
    vec3 computedNormal = cross(toA, toB);
    vec3 vNormal = computedNormal;
    // ...
}