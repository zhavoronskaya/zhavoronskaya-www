export default /*glsl */ `
varying vec3 vColor;
uniform float uTime;
uniform vec3 uColor;


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

    float  strength = 1.0 - flower((gl_PointCoord - vec2(0.5)), 0.2, 5, 10.3)*3.5;

    vec3 color = mix( uColor,vColor,  (strength));
    gl_FragColor = vec4(color,strength);
}`;
