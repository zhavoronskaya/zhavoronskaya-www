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
  // float strength =0.1/setDistanceToCenter(gl_PointCoord, vec2(0.5)) - 0.1*2.0;
    float strength = setShyny(gl_PointCoord , vec2(0.5), 0.1);
   

    vec2 pixel = vec2(0.01,0.0);

float s1 = setShyny(gl_PointCoord + pixel.xy,vec2(0.5), 0.1);
float s2 = setShyny(gl_PointCoord - pixel.xy, vec2(0.5), 0.1);
float s3 = setShyny(gl_PointCoord + pixel.yx, vec2(0.5), 0.1);
float s4 = setShyny(gl_PointCoord - pixel.yx, vec2(0.5), 0.1);
vec3 normal = normalize(vec3(s1 - s2, s3 - s4, 0.3));


// Diffuse lighting
vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
vec3 lightColor = vec3(1.0, 1.0, 0.9);
float dp = max(0.0, dot(lightDir, normal));

vec3 diffuse = dp * lightColor;
vec3 specular = vec3(0.0);

// Specular
vec3 r = normalize(reflect(-lightDir, normal));
float phongValue = 1.0- max(0.0, dot(vec3(0.0, 0.0, 1.0), r));
phongValue = pow(phongValue, 32.0);

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


    vec3 color = mix( vColor, vec3(0.397,0.76,0.81), smoothstep(0.0,32.0, strength));
    vec3 lighting = diffuse;
color = color * lighting +specular;
color = pow(color, vec3(1.0 / 0.8));
  // // Add a fiery glow
  // float glowAmount = smoothstep(0.0, 32.0, abs(strength));
  // glowAmount = 1.0 - pow(glowAmount, 0.125);
  // color += glowAmount * vec3(1.0, 0.2, 0.05);
    gl_FragColor = vec4(vec3(color), strength);
}`;
