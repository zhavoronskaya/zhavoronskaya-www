export default /*glsl */ `
varying vec3 vColor;
uniform float uTime;




float setDistanceToCenter(vec2 uv, vec2 mid) {
    return distance(uv, mid);
 }

float setShyny(vec2 uv, vec2 mid, float value) {
return (value/ distance(uv, mid)) - 2.0 * value;
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

float flower(vec2 p, float r,  int n, float m)
{
    // next 4 lines can be precomputed for a given shape
    float an = 3.141593/float(n);
    float en = 3.141593/m;  // m is between 2 and n
    vec2  acs = vec2(cos(an),sin(an));
    vec2  ecs = vec2(cos(en),sin(en)); // ecs=vec2(0,1) for regular polygon

    float bn = mod(atan(p.x,p.y),2.0*an) - an;
    p = length(p)*vec2(cos(bn),abs(sin(bn)));
    p -= r*acs;
    p += ecs*clamp( -dot(p,ecs), 0.0, r*acs.y/ecs.y);
    return length(p)*sign(p.x);
}

void main() {
  // float strength =0.1/setDistanceToCenter(gl_PointCoord, vec2(0.5)) - 0.1*2.0;
    // float strength = setShyny(gl_PointCoord , vec2(0.5), 0.1);
    vec2 coord = gl_PointCoord - vec2(0.5);
    // float strength =1.0 -  sdEgg(coord, 0.08,0.02 )*4.0;

    float  strength = 1.0 - flower(coord, 0.2, 5, 10.3)*3.5;


    vec2 pixel = vec2(0.006,0.0);

// float s1 = setShyny(gl_PointCoord + pixel.xy,vec2(0.5), 0.1);
// float s2 = setShyny(gl_PointCoord - pixel.xy, vec2(0.5), 0.1);
// float s3 = setShyny(gl_PointCoord + pixel.yx, vec2(0.5), 0.1);
// float s4 = setShyny(gl_PointCoord - pixel.yx, vec2(0.5), 0.1);
// vec3 normal = normalize(vec3(s1 - s2, s3 - s4, 0.3));
float s1 = 1.0 -  flower(coord + pixel.xy, 0.2, 5, 10.3)*3.5;

float s2 = 1.0 -  flower(coord - pixel.xy, 0.2, 5, 10.3)*3.5;

float s3 = 1.0 -  flower(coord + pixel.yx, 0.2, 5, 10.3)*3.5;

float s4 = 1.0 -  flower(coord - pixel.yx, 0.2, 5, 10.3)*3.5;

vec3 normal = normalize(vec3(s1 - s2, s3 - s4, 0.5));


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
