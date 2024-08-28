export default /*glsl */ `
varying vec3 vColor;
uniform float uTime;


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
    vec2 coord = gl_PointCoord - vec2(0.5);

    float  strength = 1.0 - flower(coord, 0.2, 5, 10.3)*3.5;


    vec2 pixel = vec2(0.006,0.0);

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


    vec3 color = mix( vColor, vec3(0.397,0.67,0.71), smoothstep(0.0,64.0, strength));
    vec3 lighting = diffuse;
    color = color * lighting +specular;
    color = pow(color, vec3(1.0 / 0.9));
    gl_FragColor = vec4(vec3(color), strength);
}`;
