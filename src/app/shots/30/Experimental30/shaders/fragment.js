export default /*glsl */ `
varying vec3 vColor;
uniform float uTime;




float setDistanceToCenter(vec2 uv, vec2 mid) {
    return distance(uv, mid);
 }

float setShyny(vec2 uv, vec2 mid, float value) {
return (value/ distance(uv, mid)) - 2.0 * value;
}




// float dot2( in vec2 v ) { return dot(v,v); }
// float sdHeart( in vec2 p )
// {
//     p.x = abs(p.x);

//     if( p.y+p.x>1.0 )
//         return sqrt(dot2(p-vec2(0.25,0.75))) - sqrt(2.0)/4.0;
//     return sqrt(min(dot2(p-vec2(0.00,1.00)),
//                     dot2(p-0.5*max(p.x+p.y,0.0)))) * sign(p.x-p.y);
// }


void main() {
  // float strength =0.1/setDistanceToCenter(gl_PointCoord, vec2(0.5)) - 0.1*2.0;
  // vec2 p = (gl_PointCoord*4.0);
  // p.y -= 2.0;
  // p.x -=2.0;
  //   float strength =1.0 - sdHeart(-p);

  float strength = 0.15 / (distance(vec2(gl_PointCoord.x, (gl_PointCoord.y - 0.5) * 5.0 + 0.5), vec2(0.5)));
strength *= 0.15 / (distance(vec2(gl_PointCoord.y, (gl_PointCoord.x - 0.5) * 5.0 + 0.5), vec2(0.5)));
  

    vec3 color = vColor;
 
color = pow(color, vec3(1.0 / 0.9));

    gl_FragColor = vec4(vec3(color), strength);
}`;
