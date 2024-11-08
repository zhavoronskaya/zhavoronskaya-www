export default /*glsl */ `
#define PI 3.1415926538;

uniform sampler2D positions;


varying vec2 vUv;

vec3 lorenzAttractor(vec3 pos) {
    // Lorenz Attractor parameters
    float a = 10.0;
    float b = 28.0;
    float c = 2.6666666667;
    // Timestep 
    float dt = 0.004;


    float x = pos.x;
    float y = pos.y;
    float z = pos.z;

    float dx, dy, dz;
  
  dx = (a * (y - x))*dt;
  
  dy = (x * (b - z) - y)*dt;
  
  dz = (x * y - c * z)*dt;
  
  return vec3(dx, dy, dz);
}

vec3 dequanAttractor(vec3 pos) {
    float a = 40.0;
    float b = 1.833;
    float c = 0.16;
    float d = 0.65;
    float e = 55.0;
    float f = 20.0;
     // Timestep 
    float dt = 0.0005;


    float x = pos.x;
    float y = pos.y;
    float z = pos.z;

    float dx, dy, dz;
    dx = ( a*(y-x) + c*x*z) * dt;
    dy = (e*x + f*y - x*z) * dt;
    dz = (b*z + x*y - d*x*x) * dt;
    return vec3(dx, dy, dz);
}

vec3 thomasAttractor(vec3 pos) {
    float b = 0.19;
    // Timestep 
    float dt = 0.01;
    float x = pos.x;
   
   float y = pos.y;
   
   float z = pos.z;
    float dx, dy, dz;
    dx = (-b*x + sin(y)) * dt;
    dy = (-b*y + sin(z)) * dt;
    dz = (-b*z + sin(x)) * dt;
    return vec3(dx, dy, dz);
}

vec3 arneodoAttractor(vec3 pos) {
    float a = -5.5;
    float b = 3.5;
    float d = -1.0;
    // Timestep 
    float dt = 0.0020;
    float x = pos.x;
   
   float y = pos.y;
   
   float z = pos.z;
    float dx, dy, dz;
    dx = y * dt;
    dy = z * dt;
    dz = (-a*x -b*y -z + (d* (pow(x, 3.0)))) * dt;
    return vec3(dx, dy, dz);
}
vec3 lorezMod2Attractor(vec3 pos) {
    // Lorenz Mod2 Attractor parameters
    float a = 0.9;
    float b = 5.0;
    float c = 9.9;
    float d = 1.0;
    // Timestep 
    float dt = 0.0005;
    float x = pos.x;
   
   float y = pos.y;
   
   float z = pos.z;
    float dx, dy, dz;
  
  dx = (-a*x+ y*y - z*z + a *c) * dt;
    dy = (x*(y-b*z)+d)  * dt;
    dz = (-z + x*(b*y +z))  * dt;
    return vec3(dx, dy, dz);
}

vec3 aizawaAttractor(vec3 pos) {
    float a = 0.95;
    float b = 0.7;
    float c = 0.6;
    float d = 3.5;
    float e = 0.25;
    float f = 0.1;
    // Timestep 
    float dt = 0.003;
    float x = pos.x;
   
   float y = pos.y;
   
   float z = pos.z;
    float dx, dy, dz;
    dx = ((z-b) * x - d*y) * dt;
    dy = (d * x + (z-b) * y) * dt;
    dz = (c + a*z - ((z*z*z) / 3.0) - (x*x) + f * z * (x*x*x)) * dt;
    return vec3(dx, dy, dz);
}
vec3 dradasAttractor(vec3 pos) {
    float a = 3.0;
    float b = 2.7;
    float c = 1.7;
    float d = 2.0;
    float e = 9.0;
    // Timestep 
    float dt = 0.0020;
    float x = pos.x;
   
   float y = pos.y;
   
   float z = pos.z;
    float dx, dy, dz;
    dx = (y- a*x +b*y*z) * dt;
    dy = (c*y -x*z +z) * dt;
    dz = (d*x*y - e*z) * dt;
    return vec3(dx, dy, dz);
}
void main() {
  vec3 pos = texture2D(positions, vUv).rgb;
  vec3 velo = vec3(0.0);

  velo = dradasAttractor(pos);
  pos.x += velo.x;
  pos.y += velo.y;
  pos.z += velo.z;

  // pos.x += 0.5;
  // pos.y += 0.5;
  // pos.z += 0.5;

  gl_FragColor = vec4(pos, 1.0);
}
 
`;
