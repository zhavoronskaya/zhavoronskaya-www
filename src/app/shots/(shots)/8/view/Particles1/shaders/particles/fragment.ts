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


    vec3 color = mix( vColor, vec3(0.397,0.76,0.81), smoothstep(0.0,32.0, strength));
    vec3 lighting = diffuse;
    color = color * lighting +specular;
    color = pow(color, vec3(1.0 / 0.8));
    gl_FragColor = vec4(vec3(color), strength);

}`;
