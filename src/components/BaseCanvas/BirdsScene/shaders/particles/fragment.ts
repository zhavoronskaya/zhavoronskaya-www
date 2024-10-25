export default /*glsl */ `

uniform vec3 color;
//uniform sampler2D displacementTexture;

void main() {
  vec2 xy = gl_PointCoord.xy - vec2(0.5);
  float ll = length(xy);

  //  vec4 color = texture2D(displacementTexture, gl_PointCoord.xy);
  // gl_FragColor = color;
    if(ll > 0.5)
        discard;
  gl_FragColor = vec4(color, step(ll, 0.5) * 0.15);

}`;
