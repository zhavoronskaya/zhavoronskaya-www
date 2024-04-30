export default /*glsl */ `

uniform float uTime;
uniform vec2 uResolution;
uniform sampler2D uTexture;


#define MAX_STEPS 100
#define MAX_DIST 250.0
#define SURFACE_DIST 0.001
#define MAX_OCTAVES 6

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


vec3 noised(vec2 x){
  vec2 p=floor(x);
  vec2 f=fract(x);
  vec2 u=f*f*(3.-2.*f);

  float a=textureLod(uTexture,(p+vec2(.0,.0))/256.,0.).x;
  float b=textureLod(uTexture,(p+vec2(1.0,.0))/256.,0.).x;
  float c=textureLod(uTexture,(p+vec2(.0,1.0))/256.,0.).x;
  float d=textureLod(uTexture,(p+vec2(1.0,1.0))/256.,0.).x;
 
  float noiseValue = a+(b-a)*u.x+(c-a)*u.y+(a-b-c+d)*u.x*u.y;
  vec2 noiseDerivative = 6.*f*(1.-f)*(vec2(b-a,c-a)+(a-b-c+d)*u.yx);

  return vec3(noiseValue,noiseDerivative);
}

mat2 m=mat2(.8,-.6,.6,.8);

float terrain(vec2 p){
  vec2 p1 = p * 0.06;
  float a = 0.0;
  float b = 2.0;
	vec2  d = vec2(0.0);
  float scl = 2.75;

  for( int i=0; i<MAX_OCTAVES; i++ ) {
    vec3 n = noised(p1);
    d+=n.yz;
    a += b*n.x/(dot(d,d) + 1.0);
    b *= -0.4;
    a *= 0.85;
    p1 = m*p1*scl;
  }
  
  return a*4.0;
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

float sdSphere(vec3 p, float radius) {
    return length(p) - radius;
}

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b-a)/k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}
float sdSine(vec3 p) {
  return (sin(p.x) + sin(p.y)+ sin(p.z))/3.0;
}

float scene(vec3 p) {

  // float displacement = cnoise(p.xy*8.0 + uTime * 0.5) / 2.0;
  // float d2 = sdSphere(p + vec3(-8.0, -10.0,12.0), 2.0);

  // float d3 = sdSphere(p + vec3(-6.0, -4.0,8.0), 1.2);

//   float d5 = sdSphere(p + vec3(-11.0, -11.0,16.0), 2.2);
// d3 = smin(d3,d2, 0.7);
// d3 = smin(d3,d5, 0.7);
// d3 +=displacement;
  // d4 = max(d4, sdSine((p+ vec3(5.0, -9.0,6.0))*20.0 ));

  p = rotate(p, vec3(0.0,1.0,0.0), uTime*0.6);
  float displacement = cnoise(p.yy*8.0 + uTime * 0.5) / 2.0;
    displacement += cnoise(p.xy*8.0 + uTime * 0.5) / 4.0;
  float d4 = sdSphere(p + vec3(8.0, -10.0,12.0), 2.0);


  p.z += sin(uTime)*1.0;
  p.x +=cos(uTime)*1.0;
  float d = p.y - terrain(p.xz);
  float d3 = sdSphere(p + vec3(-6.0- uTime, -12.0,8.0), 1.2);
//     float d5 = sdSphere(p + vec3(-11.0 +uTime*2.0 , -3.0,16.0), 2.2);
//     float d2 = sdSphere(p + vec3(-16.0 + uTime*2.0, -4.0,12.0), 2.0);
// d3 = smin(d3,d2, 0.7);
// d3 = smin(d3,d5, 0.7);
  d3+=displacement;
 
  d= smin(d,d4, 0.7);
  // d= smin(d,d3, 0.7);

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

// vec3 lightPosition=vec3(-50.0 ,20.0 , 50.0);
vec3 lightPosition=vec3(-5.0, 9.0,-6.0);


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


// Simplex 2D noise
//
vec3 permute(vec3 x) { return mod(((x*44.0)+1.0)*x, 299.0); }

float simplexNoise2d(vec2 v)
{
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
            -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 299.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}


vec3 fog(vec3 ro, vec3 rd, vec3 col, float d){
  vec3 pos = ro + rd * d;
  float sunAmount = max(dot(rd, lightPosition), 0.0)*0.2;

  float b = 1.3;
  // Applying exponential decay to fog based on distance
  float fogAmount = 0.2 * exp(-ro.y * b) * (1.0 - exp(-d * rd.y * b)) / rd.y;
  vec3 fogColor = mix(vec3(0.17,0.2,0.85), vec3(1.1,0.6,0.95), pow(sunAmount,2.0));

  return mix(col, fogColor, clamp(fogAmount,0.0,1.0));
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
void main() {
  vec2 uv = gl_FragCoord.xy/uResolution.xy;
  uv -= 0.5;
  uv.x *= uResolution.x / uResolution.y;

  vec3 ro = vec3(0.0, 6.0, 5.0);
  vec3 rd = normalize(vec3(uv, -1.0));

  float d = raymarch(ro, rd);
  vec3 p = ro + rd * d;

  vec3 color = vec3(0.0);



  if(d<MAX_DIST) {
    vec3 normal = getNormal(p);
    vec3 lightDirection = normalize(lightPosition - p);
    vec3 viewDirection = normalize(ro - p);
    vec3 light = vec3(0.0);
        light += directionalLight(
        vec3(0.87,0.93,0.88),// Light color 
    1.0, // Light intensity
    normal,              // Normal
    lightPosition, // Light position
    viewDirection,       // View direction
    20.0                 // Specular power
   );
   
    
    float diffuse = max(dot(normal, lightDirection), 0.0);
    float shadows = softShadows(p, lightDirection, 0.1, 5.0, 8.0);
    float snowMix = step(1.2 + simplexNoise2d(vec2(p.x +cos(uTime)*3.0, p.z +sin(uTime)*3.0)*15.0)*0.4, p.y);
    float glow = smoothstep(0.0,8.0,p.y);
glow =pow(glow,4.);
    // color = mix( vec3(0.78, 0.23, 0.80),vec3(1.0), snowMix) * glow * (diffuse*light) * shadows;
    color =  vec3(0.78, 0.23, 0.80) * glow * (diffuse) * shadows;
    vec3 moonPos =  vec3(-5.0, 9.0,-6.0);
    vec3 moonDirection = normalize(moonPos - p);
      //frenel for moon
  float frenel = dot(viewDirection, normal)+1.0;
  
  frenel = smoothstep(0.0,2.0, frenel);
  frenel =  pow(frenel,32.0);

  
 
float moonMix = step(6.0, p.y);

  vec3 moonColor =  vec3(0.99, 0.72, 0.95) ;
  moonColor = mix(moonColor,vec3(0.01, 0.01, 0.030), 1.0 - frenel);
  // moonColor *=frenel;

  color = mix(color,moonColor,moonMix);


// color = vec3(normal);
    
    // apply fog to raymarched landscape
    color = fog(ro, rd, color, d);
  }

else {
  float grad = smoothstep(0.0,22.0, p.y);
  color = mix( vec3(0.09, 0.09, 0.20), vec3(0.01, 0.01, 0.030),grad);
}
  gl_FragColor = vec4(color, 1.0);


  #include <tonemapping_fragment>
    #include <colorspace_fragment>
}`;
