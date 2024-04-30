export default /*glsl */ `
uniform vec2 uResolution;
uniform sampler2D uPictureTexture;
uniform sampler2D uDisplacementTexture;

attribute float aIntensity;
attribute float aAngle;

varying vec3 vColor;
varying float vAlpha;

void main()
{
    // Displacement
    vec3 newPosition = position;
    float displacementIntensity = texture(uDisplacementTexture, uv).r;
    displacementIntensity = smoothstep(0.1, 0.2, displacementIntensity);

    vec3 displacement = vec3(
        cos(aAngle) * 0.2,
        sin(aAngle) * 0.2,
        1.0
    );
    displacement = normalize(displacement);
    displacement *= displacementIntensity;
    displacement *= 3.0;
    displacement *= aIntensity;
    
    newPosition += displacement;

    // Final position
    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    // Picture
    float pictureIntensity = texture(uPictureTexture, uv).r;
		vAlpha =texture(uPictureTexture, uv).a;
    // Point size
    gl_PointSize = 0.15 * pictureIntensity * uResolution.y;
    // gl_PointSize *= (1.0 / - viewPosition.z);
		  gl_PointSize *= step(1.0 - (1.0/256.0), position.z) + 0.1;

    // Varyings
    vColor = vec3(pow(pictureIntensity, 2.0));
		vColor = mix(vec3(0.0),vec3(0.1),(pow(pictureIntensity, 64.0)));
}`;
