export default /*glsl */ `
#define PI 3.14159265358979

uniform float uTime;
varying vec2 vUv;
varying float vDisplacement;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vColor;



float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}


vec2 m = vec2(.7,.8);

float hash( in vec2 p ) 
{
    return fract(sin(p.x*15.32+p.y*5.78) * 43758.236237153);
}


vec2 hash2(vec2 p)
{
	return vec2(hash(p*.754),hash(1.5743*p.yx+4.5891))-.5;
}

vec2 hash2b( vec2 p )
{
    vec2 q = vec2( dot(p,vec2(127.1,311.7)), 
				   dot(p,vec2(269.5,183.3)) );
	return fract(sin(q)*43758.5453)-.5;
}


mat2 m2= mat2(.8,.6,-.6,.8);

// Gabor/Voronoi mix 3x3 kernel (some artifacts for v=1.)
float gavoronoi3(in vec2 p)
{    
    vec2 ip = floor(p);
    vec2 fp = fract(p);
    float f = 2.*PI;//frequency
    float v = .8;//cell variability <1.
    float dv = .4;//direction variability <1.
    vec2 dir = m;//vec2(.7,.7);
    float va = 0.0;
   	float wt = 0.0;
    for (int i=-1; i<=1; i++) 
	for (int j=-1; j<=1; j++) 
	{		
        vec2 o = vec2(i, j)-.5;
        vec2 h = hash2(ip - o);
        vec2 pp = fp +o  -h;
        float d = dot(pp, pp);
        float w = exp(-d*4.);
        wt +=w;
        h = dv*h+dir;//h=normalize(h+dir);
        va += cos(dot(pp,h)*f/v)*w;
	}    
    return va/wt;
}

// ------

float noise( vec2 p)
{   
    return gavoronoi3(p);
}

// ------

float map(vec2 p){

   return 2.*abs( noise(p*10.));

}

vec3 nor(in vec2 p)
{
	const vec2 e = vec2(0.002, 0.0);
	return -normalize(vec3(
		map(p + e.xy) - map(p - e.xy),
		map(p + e.yx) - map(p - e.yx),
		.15));
}



void main() {
  vec3 modelColour =  vColor;

  vec3 light = normalize(vec3(3., 2., -1.));
  float str = max(dot(nor(vUv), light),0.25);
 
  modelColour = mix(vec3(0.858,0.16,.963), modelColour, 1.0 - str);
  vec3 lighting = vec3(0.0);

  // vec3 normal = normalize(vNormal);
  vec3 normal = normalize(
      cross(
          dFdx(vec3(vPosition)),
          dFdy(vec3(vPosition))));
  vec3 viewDir = normalize(cameraPosition - vPosition);

  // Ambient
  vec3 ambient = vec3(1.0);

  // Hemi
  vec3 skyColour = vec3(0.0, 0.3, 0.6);
  vec3 groundColour = vec3(0.6, 0.3, 0.1);

  vec3 hemi = mix(groundColour, skyColour, remap(normal.y, -1.0, 1.0, 0.0, 1.0));

  // Diffuse lighting
  vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
  vec3 lightColour = vec3(1.0, 1.0, 0.9);
  float dp = max(0.0, dot(lightDir, normal));

  vec3 diffuse = dp * lightColour;
  vec3 specular = vec3(0.0);

  // Specular
  vec3 r = normalize(reflect(-lightDir, normal));
  float phongValue = max(0.0, dot(viewDir, r));
  phongValue = pow(phongValue, 64.0);

  specular += phongValue * 4.15;


  // Fresnel
  float fresnel = 1.0 - max(0.0, dot(viewDir, normal));
  fresnel = pow(fresnel, 2.0);

  specular *= fresnel;

  // Combine lighting
  lighting = hemi * 0.1 + diffuse;

  vec3 colour = modelColour * lighting + specular;
 
 gl_FragColor = vec4(pow(colour, vec3(1.0 / 2.2)), 1.0);

// float shellDir =clamp(((vUv.y-0.5)*5.0), 0.0,1.0) ;
// gl_FragColor = vec4(vec3(shellDir),1.0);

}`;
