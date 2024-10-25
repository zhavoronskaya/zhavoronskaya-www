export default /*glsl */ `

uniform vec3 uColor;
//uniform sampler2D displacementTexture;

void main() {
  vec2 xy = gl_PointCoord.xy - vec2(0.5);
  float ll = length(xy);

  //  vec4 color = texture2D(displacementTexture, gl_PointCoord.xy);
  // gl_FragColor = color;
    if(ll > 0.5)
        discard;
  gl_FragColor = vec4(uColor, step(ll, 0.5) * 0.45);


  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;
