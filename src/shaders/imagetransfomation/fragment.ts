// eslint-disable-next-line import/no-anonymous-default-export
export default /*glsl */ `
#define HIGH_PRECISION
varying vec2 vUv;
uniform sampler2D uFirstImage;
uniform sampler2D uSecondImage;
uniform float uProgress;
uniform vec2 uResolution;
uniform vec2 uMouse;


const float GAMMA = 2.2;

vec3 gamma(vec3 color, float g) {
  return pow(color, vec3(g));
}

vec3 linearToScreen(vec3 linearRGB) {
  return gamma(linearRGB, 1.0 / GAMMA);
}

float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}




//	Simplex 3D Noise 
//	by Ian McEwan, Stefan Gustavson (https://github.com/stegu/webgl-noise)
//
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){ 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //  x0 = x0 - 0. + 0.0 * C 
  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1. + 3.0 * C.xxx;

// Permutations
  i = mod(i, 289.0 ); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients
// ( N*N points uniformly over a square, mapped onto an octahedron.)
  float n_ = 1.0/7.0; // N=7
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}



float sdfCircle(vec2 p, float r) {
    return length(p) - r;
}





void main() {

  vec2 coords = (vUv - 0.5 - uMouse) * uResolution;
  float noise = snoise(vec3(coords,uProgress)*0.005);
  // coords *= noise;
  // noise =  snoise(vec3(coords+200.0,uProgress)*80.0);
//  noise *= snoise(vec3((wavedUv-0.5)*uResolution, 0.0) * 0.00001);
  //float size = smoothstep(0.0, 1.0, uProgress) * (length(uResolution) * 0.5+50.);
  float size =uProgress * (length(uResolution))*(1.4+ length(uMouse));
  float d = sdfCircle(coords + 200.0* noise, size);

  // float d1 = sdfCircle(coords + vec2(-300.0,200.)*noise , size);
  // float d2 = sdfCircle(coords + vec2(300.0,-200.)*noise  , size);
  // d = min(d,d1);
  // d= min(d,d2);

// float offx = vUv.x + sin(vUv.y + 0.3 * .1);
// float offy = vUv.y - cos(0.3 * .001) * .01;
// float n = (snoise(vec3(offx,offy, uProgress))*uProgress*22.0);
// // n = clamp(n, 0.0, 1.0);
// float c = (sdfCircle((vUv - vec2(0.5)),uProgress));
// float finalMask =  pow(n*c,12.0);
// finalMask = clamp(finalMask, 0.0,1.0);
  vec4 tex1 = texture2D(uFirstImage, vUv);
  vec4 tex2 =  texture2D(uSecondImage, vUv);
  vec4 texmix = mix(tex2, tex1, smoothstep(0.0, 1.0, d));

  gl_FragColor = vec4(texmix);
}`;
