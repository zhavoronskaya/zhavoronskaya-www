float getWobble(vec3 position)
{
    vec3 warpedPosition = position;
    warpedPosition += simplexNoise4d(
        vec4(
            position * uWarpPositionFrequency,
            uTime * uWarpTimeFrequency
        )
    ) * uWarpStrength;

    return simplexNoise4d(vec4(
        warpedPosition * uPositionFrequency, // XYZ
        uTime * uTimeFrequency         // W
    )) * uStrength;
}