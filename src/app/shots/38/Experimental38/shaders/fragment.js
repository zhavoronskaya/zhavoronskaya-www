export default /*glsl */ `
varying vec3 vColor;
varying float vAlpha;

void main()
{
    vec2 uv = gl_PointCoord;
    float distanceToCenter = length(uv - vec2(0.5));
		float strength = 0.5 / (distance(vec2(uv.x, (uv.y - 0.5) * 5.0 + 0.5), vec2(0.5)));
strength *= 0.5 / (distance(vec2(uv.y, (uv.x - 0.5) * 5.0 + 0.5), vec2(0.5)));
    if(strength < 0.5)
        discard;

    gl_FragColor = vec4(vColor, vAlpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}`;
