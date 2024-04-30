export default /*glsl */ `
#define PI 3.1415926535897932384626433832795
precision highp float;

attribute float pindex;
attribute vec3 position;
attribute vec3 offset;
attribute vec2 uv;
attribute float angle;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

uniform float uTime;
uniform float uRandom;
uniform float uDepth;
uniform float uSize;
uniform vec2 uTextureSize;
uniform sampler2D uTexture;
uniform sampler2D uTouch;
uniform vec2 uMouse;

varying vec2 vPUv;
varying vec2 vUv;
// Simplex 2D noise
//
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
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

float random(float n) {
	return fract(sin(n) * 43758.5453123);
}



float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
          uv -= disc_center;
          uv*=uTextureSize;
          float dist = sqrt(dot(uv, uv));
          return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
        }

void main() {


	vUv = uv;

	// particle uv
	vec2 puv = (offset.xy)/ uTextureSize ;
	vPUv = puv;

	// pixel color
	vec4 colA = texture2D(uTexture, puv);
	float grey = colA.r * 0.81 + colA.g * 0.71 + colA.b * 0.7;
	// float grey = colA.r * 0.1 + colA.g * 0.1 + colA.b * 0.07;
	// displacement
	vec3 displaced = offset;
	
	// randomise
	// displaced.xy += vec2(random(pindex) - 0.5, random(offset.x + pindex) - 0.5) * uRandom;
	float rndz = (random(pindex) + snoise(vec2(pindex , uTime * 0.5)))*0.1;
	displaced.z += rndz * (random(pindex) * 2.0 * uDepth);


	// center
	displaced.xy -= uTextureSize * 0.5;

	// touch
	float distToCenter = length(puv - uMouse);
   float d =  abs(sin(distToCenter*2.0+ angle)*30.0);
   vec2 dir = normalize(puv - uMouse);
   vec2 rippleCords =rndz*d*dir;
	 displaced.x +=rippleCords.x;
	 displaced.y +=rippleCords.y;
	 displaced.xy +=rippleCords;
	 	 displaced.z +=rndz*d;
	//  	float t = -circle(puv, uMouse, 100.0, 3.0);
		displaced.x += cos(angle+distToCenter*20.0) *distToCenter * 40.0 * rndz;
	displaced.y += sin(angle+distToCenter*20.0) *distToCenter * 40.0 * rndz;
	 displaced.z +=rndz*distToCenter*40.0;
	// float t = -circle(puv, uMouse, 100.0, 3.0);

	// // float t = texture2D(uTexture, puv).r ;
	// displaced.z += t * 20.0 * rndz;
	// displaced.x += cos(angle) * t * 20.0 * rndz;
	// displaced.y += sin(angle) * t * 20.0 * rndz;

	// particle size
	float psize = (snoise(vec2(uTime, pindex) * 0.5) + 2.0);
	psize *= max(grey, 0.9);
	psize *= uSize;

	// // final position
	vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
	mvPosition.xyz += position * psize;
	vec4 finalPosition = projectionMatrix * mvPosition;



	gl_Position = finalPosition;
}`;
