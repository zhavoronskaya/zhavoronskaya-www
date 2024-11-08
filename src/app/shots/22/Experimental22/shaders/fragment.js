export default /*glsl */ `
varying vec3 vColor;
uniform float uTime;




float setDistanceToCenter(vec2 uv, vec2 mid) {
    return distance(uv, mid);
 }

float setShyny(vec2 uv, vec2 mid, float value) {
return (value/ distance(uv, mid)) - 2.0 * value;
}




float sdMoon(vec2 p, float d, float ra, float rb )
{
    p.y = abs(p.y);
    float a = (ra*ra - rb*rb + d*d)/(2.0*d);
    float b = sqrt(max(ra*ra-a*a,0.0));
    if( d*(p.x*b-p.y*a) > d*d*max(b-p.y,0.0) )
          return length(p-vec2(a,b));
    return max( (length(p          )-ra),
               -(length(p-vec2(d,0))-rb));
}


mat2 rotate2D(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}


vec3 hash( vec3 p ) // replace this by something better
{
	p = vec3( dot(p,vec3(127.1,311.7, 74.7)),
            dot(p,vec3(269.5,183.3,246.1)),
            dot(p,vec3(113.5,271.9,124.6)));

	return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}

float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}

float noise( in vec3 p )
{
  vec3 i = floor( p );
  vec3 f = fract( p );
	
	vec3 u = f*f*(3.0-2.0*f);

  return mix( mix( mix( dot( hash( i + vec3(0.0,0.0,0.0) ), f - vec3(0.0,0.0,0.0) ), 
                        dot( hash( i + vec3(1.0,0.0,0.0) ), f - vec3(1.0,0.0,0.0) ), u.x),
                   mix( dot( hash( i + vec3(0.0,1.0,0.0) ), f - vec3(0.0,1.0,0.0) ), 
                        dot( hash( i + vec3(1.0,1.0,0.0) ), f - vec3(1.0,1.0,0.0) ), u.x), u.y),
              mix( mix( dot( hash( i + vec3(0.0,0.0,1.0) ), f - vec3(0.0,0.0,1.0) ), 
                        dot( hash( i + vec3(1.0,0.0,1.0) ), f - vec3(1.0,0.0,1.0) ), u.x),
                   mix( dot( hash( i + vec3(0.0,1.0,1.0) ), f - vec3(0.0,1.0,1.0) ), 
                        dot( hash( i + vec3(1.0,1.0,1.0) ), f - vec3(1.0,1.0,1.0) ), u.x), u.y), u.z );
}

float sdEgg( in vec2 p, in float ra, in float rb )
{
    const float k = sqrt(3.0);
    p.x = abs(p.x);
    float r = ra - rb;
    return ((p.y<0.0)       ? length(vec2(p.x,  p.y    )) - r :
            (k*(p.x+r)<p.y) ? length(vec2(p.x,  p.y-k*r)) :
                              length(vec2(p.x+r,p.y    )) - 2.0*r) - rb;
}
void main() {
  // float strength =0.1/setDistanceToCenter(gl_PointCoord, vec2(0.5)) - 0.1*2.0;
    float strength = setShyny(gl_PointCoord , vec2(0.5), 0.02);
    float starRadius = 0.2;


    vec2 coord = gl_PointCoord - vec2(0.5);
    // coord = rotate2D(3.14159 * uTime*0.1) * coord;
    // strength =1.0 -  sdEgg(coord, 0.08,0.02 )*10.0;


    // float  strength = 0.0;
 

    // strength=glow;


    vec2 pixel = vec2(0.006,0.0);

float s1 = setShyny(gl_PointCoord + pixel.xy,vec2(0.5), 0.02);
float s2 = setShyny(gl_PointCoord - pixel.xy, vec2(0.5), 0.02);
float s3 = setShyny(gl_PointCoord + pixel.yx, vec2(0.5), 0.02);
float s4 = setShyny(gl_PointCoord - pixel.yx, vec2(0.5), 0.02);
// vec3 normal = normalize(vec3(s1 - s2, s3 - s4, 0.3));
// float s1 = 1.0 -  sdEgg(coord + pixel.xy,0.08,0.02 )*4.0;

// float s2 = 1.0 -  sdEgg(coord - pixel.xy, 0.08,0.02 )*4.0;

// float s3 = 1.0 -  sdEgg(coord + pixel.yx, 0.08,0.02 )*4.0;

// float s4 = 1.0 -  sdEgg(coord - pixel.yx, 0.08,0.02 )*4.0;

vec3 normal = normalize(vec3(s1 - s2, s3 - s4, 0.6));
// float s1 = 1.0 -  sdMoon(coord + pixel.xy,0.1,0.09,0.08)*50.5;

// float s2 = 1.0 -  sdMoon(coord - pixel.xy,0.1,0.09,0.08)*50.5;

// float s3 = 1.0 -  sdMoon(coord + pixel.yx,0.1,0.09,0.08)*50.5;

// float s4 = 1.0 -  sdMoon(coord - pixel.yx,0.1,0.09,0.08)*50.5;

// vec3 normal = normalize(vec3(s1 - s2, s3 - s4, 0.5));


// Diffuse lighting
vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
vec3 lightColor = vec3(1.0, 1.0, 0.9);
float dp = max(0.0, dot(lightDir, normal));

vec3 diffuse = dp * lightColor;
vec3 specular = vec3(0.0);

// Specular
vec3 r = normalize(reflect(-lightDir, normal));
float phongValue = 1.0 - max(0.0, dot(vec3(0.0, 0.0, 1.0), r));
phongValue = pow(phongValue, 64.0);

specular += phongValue;


// vec3 baseColor = mix(
//   vec3(0.17, 0.56, 0.725),
//   vec3(0.147, 0.678, uAvg/120.0), smoothstep(0.0, 0.1, noiseSample));
//   baseColor = mix(vec3(uAvg/120.0, 0.7856, 0.76525),
//   baseColor, smoothstep(0.3, 0.9,  1.0 - noiseSample));
// vec3 lighting = diffuse;
// vec3 color2 = vec3(0.147, uAvg/130.0, uAvg/130.0);
// // baseColor = mix(color2,
// //   baseColor, smoothstep(0.1, 0.15,  1.0 -noiseSample1));

// color = baseColor * lighting + specular;
// // color = baseColor;
// color = pow(color, vec3(1.0 / 0.9));


    vec3 color = mix( vColor, vec3(0.397,0.67,0.71), smoothstep(0.0,64.0, strength));
    vec3 lighting = diffuse;
color = color * lighting +specular;
color = pow(color, vec3(1.0 / 0.9));
  // // Add a fiery glow
  // float glowAmount = smoothstep(0.0, 32.0, abs(strength));
  // glowAmount = 1.0 - pow(glowAmount, 0.125);
  // color += glowAmount * vec3(1.0, 0.2, 0.05);
    gl_FragColor = vec4(vec3(color), strength);
}`;
