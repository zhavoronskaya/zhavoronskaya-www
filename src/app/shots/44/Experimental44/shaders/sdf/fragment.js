export default /*glsl */ `

uniform float uTime;
uniform vec2 uResolution;

#define MAX_STEPS 120
#define MAX_DIST 100.0
#define SURFACE_DIST 0.01

// Perlin 2D Noide Code
vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec2 fade(vec2 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

// Classic Perlin noise
float cnoise(vec2 P)
{
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod289(Pi); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;

  vec4 i = permute(permute(ix) + iy);

  vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;
  vec4 gy = abs(gx) - 0.5 ;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;

  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);

  vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;

  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));

  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

// Cosine color palette function from Inigo Quilez
vec3 getColor(float amount) {
  vec3 color = 0.5 + 0.5 * cos(6.2831 * (vec3(0.0, 0.1, 0.2) + amount * vec3(1.0, 1.0, 1.0)));
  return color * amount;
}


float sdSphere(vec3 p, float radius) {
    return length(p) - radius;
}

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b-a)/k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

vec3 repeat(vec3 p, float c) {
  return mod(p,c)-0.5*c;
}

float sdSine(vec3 p) {
  return (sin(p.x)*sin(p.y) + sin(p.y)*cos(p.z) + sin(p.z)*sin(p.x))/3.0;
}

float sdEllipsoid( vec3 p, vec3 r )
{
  float k0 = length(p/r);
  float k1 = length(p/(r*r));
  return k0*(k0-1.0)/k1;
}

mat4 rotation3d(vec3 axis, float angle) {
  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1.0 - c;

  return mat4(
    oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
    oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
    oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
    0.0,                                0.0,                                0.0,                                1.0
  );
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
  mat4 m = rotation3d(axis, angle);
  return (m * vec4(v, 1.0)).xyz;
}


float scene(vec3 p) {
vec3 offset = vec3(0.0,smoothstep(-1.0,1.0,sin(uTime)), 0.0);
  vec3 s = p;
  // s=mod(s,vec3(0.0,uResolution.y,0.0));
  // s = s + vec3(uResolution * 0.5,0.0);
  // s = rotate(s,vec3(0.0,1.0,0.0), uTime);
  // float displacement = cnoise(s.xy*2.0 + uTime * 0.5) / 2.0;
  // displacement += cnoise(s.xx*1.0 + uTime * 0.5) / 4.0;
  float d = sdEllipsoid(s, vec3(0.8));
  float d2 = sdEllipsoid(s + 2.0*vec3(0.0, sin(uTime), 0.0), vec3(0.6));
  float d3 = sdEllipsoid(s + vec3(cos(uTime), cos(uTime), 0.0), vec3(0.6));
  float d4 = sdEllipsoid(s - vec3(cos(uTime)*0.3, sin(uTime)*0.4, 0.0), vec3(0.7));
  // float d5 = sdSphere(s  + vec3(sin(uTime), cos(uTime), 0.0), 0.8);
  float sine = sdSine(s*40.0 - vec3(0.0,0.0,0.0));

  d =  smin(d, d2, 0.5);
  d = smin(d, d3, 0.5);
  d = smin(d, d4, 0.7);
  // d = smin(d, d5, 0.7);
// float  d = max(d, sine);
float displacement = cnoise(s.xy*2.0 + uTime * 0.5) / 1.0;

  // d = smin(d, d3, 0.5);
  //   d = smin(d, d4, 0.7);
  // d = smin(d, d5, 0.7);
  // d = max(d, sine);

  d += displacement;

  return d;
}



float raymarch(vec3 ro, vec3 rd) {
  float dO = 0.0;
  vec3 color = vec3(0.0);

  for(int i = 0; i < MAX_STEPS; i++) {
    vec3 p = ro + rd * dO;
    float dS = scene(p);

    dO += dS;

    if(dO > MAX_DIST || dS < SURFACE_DIST) {
        break;
    }
  }
  return dO;
}

vec3 getNormal(vec3 p) {
  vec2 e = vec2(.01, 0);

  vec3 n = scene(p) - vec3(
    scene(p-e.xyy),
    scene(p-e.yxy),
    scene(p-e.yyx));

  return normalize(n);
}

float softShadows(vec3 ro, vec3 rd, float mint, float maxt, float k ) {
  float resultingShadowColor = 1.0;
  float t = mint;
  for(int i = 0; i < 50 && t < maxt; i++) {
      float h = scene(ro + rd*t);
      if( h < 0.001 )
          return 0.0;
      resultingShadowColor = min(resultingShadowColor, k*h/t );
      t += h;
  }
  return resultingShadowColor ;
}

vec3 pointLight(vec3 lightColor, float lightIntensity, vec3 normal, vec3 lightPosition, vec3 viewDirection, float specularPower, vec3 position, float lightDecay)
{
    vec3 lightDelta = lightPosition - position;
    float lightDistance = length(lightDelta);
    vec3 lightDirection = normalize(lightDelta);
    vec3 lightReflection = reflect(- lightDirection, normal);

    // Shading
    float shading = dot(normal, lightDirection);
    shading = max(0.0, shading);

    // Specular
    float specular = - dot(lightReflection, viewDirection);
    specular = max(0.0, specular);
    specular = pow(specular, specularPower);

    // Decay
    float decay = 1.0 - lightDistance * lightDecay;
    decay = max(0.0, decay);

    return lightColor * lightIntensity * decay * (shading + specular);
}
vec3 directionalLight(vec3 lightColor, float lightIntensity, vec3 normal, vec3 lightPosition, vec3 viewDirection, float specularPower)
{
    vec3 lightDirection = normalize(lightPosition);
    vec3 lightReflection = reflect(- lightDirection, normal);

    // Shading
    float shading = dot(normal, lightDirection);
    shading = max(0.0, shading);

    // Specular
    float specular = - dot(lightReflection, viewDirection);
    specular = max(0.0, specular);
    specular = pow(specular, specularPower);

    return lightColor * lightIntensity * (shading + specular);
}

vec3 ambientLight(vec3 lightColor, float lightIntensity)
{
    return lightColor * lightIntensity;
}

vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d ) {
  return a + b*cos( 6.28318*(c*t+d) );
}

vec3 spectrum(float n) {
  return pal( n, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.33,0.67) );
}



const float GAMMA = 2.2;

vec3 gamma(vec3 color, float g) {
  return pow(color, vec3(g));
}

vec3 linearToScreen(vec3 linearRGB) {
  return gamma(linearRGB, 1.0 / GAMMA);
}


void main() {
  vec2 uv = gl_FragCoord.xy/uResolution.xy;
  uv -= 0.5;
  uv.x *= uResolution.x / uResolution.y;

  // Light Position
  vec3 lightPosition = vec3(-1.0 * cos(uTime * 1.5), 1.0, 1.0);

  vec3 ro = vec3(0.0, 0.0, 5.0 );
  vec3 rd = normalize(vec3(uv, -1.0));
  // rd = rotate(normalize(vec3(uv, -1.0)), vec3(0.0, 1.0, 0.0), -uTime * 0.1);
  float d = raymarch(ro, rd);
  vec3 p = ro + rd * d;



  vec3 color = vec3(0.0);

  if(d<MAX_DIST) {
    vec3 normal = getNormal(p);
    vec3 lightDirection = normalize(lightPosition - p);
    vec3 viewDirection = normalize(ro - p);

    vec3 light = pointLight(
    vec3(0.77,0.23,0.798),// Light color 
    10.0, // Light intensity
    normal,              // Normal
    lightPosition, // Light position
    viewDirection,       // View direction
    40.0,                // Specular power
    p,           // Position
    0.25                 // Light decay
   );
  //     light += directionalLight(
  //       vec3(0.27,0.63,0.88),// Light color 
  //   1.0, // Light intensity
  //   normal,              // Normal
  //   vec3(0.0, 1.0, 1.0), // Light position
  //   viewDirection,       // View direction
  //   20.0                 // Specular power
  //  );
  //  light += ambientLight( vec3(0.27,0.63,0.88),1.0);

// // Iridescent lighting
// vec3 reflection = reflect(ro, normal);
//   vec3 dome = vec3(0, 1, 0);
//   // base layer
  vec3 perturb = sin(p * 1.);
  color = spectrum(dot(normal + perturb * .005, viewDirection) * 2.);
//   // specular
//   float specular = clamp(dot(reflection, lightDirection), 0., 1.);
//   specular = pow((sin(specular * 20. - 3.) * .5 + .5) + .1, 32.) * specular;
//   specular *= .1;
//   specular += pow(clamp(dot(reflection, lightDirection), 0., 1.) + .3, 8.) * .1;
//   // shadow

//     float diffuse = max(dot(normal, lightDirection), 0.0);
//     float shadows = softShadows(p, lightDirection, 0.1, 5.0, 64.0);
//   // float shadow = pow(clamp(dot(normal, dome) * .5 + 1.2, 0., 1.), 3.);
//   color = color * (shadows+diffuse) + specular;
// // gamma correction
color = linearToScreen(color);

    float diffuse = max(dot(normal, lightDirection), 0.0);
    float shadows = softShadows(p, lightDirection, 0.1, 5.0, 64.0);
    shadows = 1.0;
    color *= vec3(1.0, 1.0, 1.0) * getColor(diffuse * shadows)*light;
  }
  else {
    // color = vec3(0.49,.45,.86);
    color=vec3(1.0,1.0,1.0);
  }

  gl_FragColor = vec4(color, 1.0);

  #include <tonemapping_fragment>
    #include <colorspace_fragment>
}`;
