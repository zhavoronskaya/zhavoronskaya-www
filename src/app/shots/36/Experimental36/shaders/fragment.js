export default /*glsl */ `
varying vec3 vColor;
uniform float uTime;




float setDistanceToCenter(vec2 uv, vec2 mid) {
    return distance(uv, mid);
 }

float setShyny(vec2 uv, vec2 mid, float value) {
return (value/ distance(uv, mid)) - 2.0 * value;
}




void main() {
  float strength =0.05/setDistanceToCenter(gl_PointCoord, vec2(0.5)) - 0.05*2.0;
//    strength = step(0.5, distance(gl_PointCoord, vec2(0.5)) + 0.1);
  // vec2 p = (gl_PointCoord*4.0);
  // p.y -= 2.0;
  // p.x -=2.0;
  //   float strength =1.0 - sdHeart(-p);

//   float strength = 0.15 / (distance(vec2(gl_PointCoord.x, (gl_PointCoord.y - 0.5) * 5.0 + 0.5), vec2(0.5)));
// strength *= 0.15 / (distance(vec2(gl_PointCoord.y, (gl_PointCoord.x - 0.5) * 5.0 + 0.5), vec2(0.5)));
  

    vec3 color = vColor;
 
// color = pow(color, vec3(1.0 / 0.9));

    gl_FragColor = vec4(vec3(color), strength);
}`;
