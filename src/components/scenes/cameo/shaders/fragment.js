const frag = /*glsl */ `

uniform float uTime;
varying vec2 vUv;
varying vec3 vColor;
varying vec3 vNormal;
varying vec3 vPosition;


void main() {


   vec3 color =  vColor;

    

  //Add light
   vec3 lighting = vec3(0.0);

    // vec3 normal = normalize(vNormal);
    vec3 normal = normalize(
        cross(
            dFdx(vec3(vPosition)),
            dFdy(vec3(vPosition))));
    vec3 viewDir = normalize(cameraPosition - vPosition);

// Ambient
vec3 ambient = vec3(0.5);
lighting= ambient;


// Diffuse lighting
vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
vec3 lightColor = vec3(1.0, 0.98, 0.87);
float dp = max(0.0, dot(lightDir, normal));

vec3 diffuse = dp * lightColor;
vec3 specular = vec3(0.0);

// Specular
vec3 r = normalize(reflect(-lightDir, normal));
float phongValue = max(0.0, dot(viewDir, r));
phongValue = pow(phongValue, 16.0);

specular += phongValue ;


// Fresnel
float fresnel = 1.0 -  max(0.0, dot(viewDir, normal));
fresnel = pow(fresnel, .5);

specular *= fresnel;

// Combine lighting
lighting += diffuse;

color = color * lighting + specular;

    
    gl_FragColor = vec4(color,1.0);

}`;

export default frag;
