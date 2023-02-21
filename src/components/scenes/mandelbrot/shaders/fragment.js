export default /*glsl */ `


uniform float uTime;
varying vec2 vUv;

    // //simple Mandelbrot
    // float mandelbrot(vec2 uv, float f){
    //   float alpha = 1.0;
    //   vec2 z = vec2(0.0 , 0.0);
    //   for(int i=0; i < 200; i++){ 
    //     float x_sq = z.x*z.x;
    //     float y_sq = z.y*z.y;
    //     float x_cb = z.x*z.x*z.x;
    //     float y_cb = z.y*z.y*z.y;
    //     vec2 z_sq = vec2(x_sq - y_sq, 2.0*z.x*z.y);
        
    //     vec2 z_cb = vec2(x_cb - y_cb, -3.0*x_cb*z.y + 3.0*y_cb*z.x);
    //     z = f* z_sq  + (uv);
    //     if(x_sq + y_sq > 4.0){
    //       alpha = float(i)/200.0;
    //       break;
    //     }
    //   }
    //   return alpha;
    // }


vec2 mul (vec2 a, vec2 b){
  return vec2(a.x*b.x - a.y*b.y, a.x*b.y + b.x*a.y);
}
// vec2 conj (vec2 a){
//   return vec2(a.x, -a.y);
// }
float mandelbrot(vec2 uv, float t){
  float alpha = 1.0;
  vec2 z = vec2(0.0 , 0.0);
  vec2 z_0;
  vec2 z_1;
  vec2 z_2;
  for(int i=0; i <314; i++){ 
    z_2 = z_1;
    z_1 = z_0;
    z_0 = z;
    float x_0_sq = z_0.x*z_0.x;
    float y_0_sq = z_0.y*z_0.y;
    vec2 z_0_sq = vec2(x_0_sq - y_0_sq, 2.0*z_0.x*z_0.y);
    float x_1_sq = z_1.x*z_1.x;
    float y_1_sq = z_1.y*z_1.y;
    vec2 z_1_sq = vec2(x_1_sq - y_1_sq, 2.0*z_1.x*z_1.y);

    z =1.01*z_0_sq + uv + sin(t+0.045)*z_1_sq
   + sin(t-0.87)*mul(z_1_sq, z_2) + cos(t+0.05)*mul(z_1_sq, z_0)
    + sin(t+0.03)*mul(z_2, z_0) + cos(t-2.3451)*mul(z_1, z_2);
    float z_0_mag = x_0_sq + y_0_sq;
    float z_1_mag = x_1_sq + y_1_sq;
    if(z_0_mag > 22.0){
      float frac = (22.0 - z_1_mag) / (z_0_mag - z_1_mag);
      alpha = (float(i) - 1.0 + frac)/314.0; 
      break;
    }
  }
  return alpha;
}

vec3 sinColorPalette(float s, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * sin(5.5 * (c * s + d));
}  

  void main(){ 

    vec2 newUv = ((vUv.yx)-vec2(0.5))*3.7;
    float s =1.0- mandelbrot(newUv, uTime*0.5);
    vec2 newUv2 = -((vUv.yx)-vec2(0.5))*3.7;
    s +=1.0 - mandelbrot(newUv2, uTime*0.5);
    
    vec3 coord = vec3(s);
    coord = fract(coord);

    vec3 color = sinColorPalette(s*s*s, pow(coord, vec3(7.0, 8.0, 5.0)), pow(coord, vec3(3.0, 6.0, 8.0)), pow(coord, vec3(5.0, 5.0, 5.0)), pow(coord, vec3(8.0, 3.0, 9.0)));

    color = mix(color, vec3(0.5488,0.98,0.5658), 1.0 - s*s*s);
    gl_FragColor = vec4(color, 1.);
  
}`;
