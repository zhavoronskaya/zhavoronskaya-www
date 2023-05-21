export default /*glsl */ `
varying vec3 vColor;
uniform float uTime;
varying vec2 vUv;
varying vec3 vwPosition;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vDistance;

float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}


void main() {
  vec2 pos = (vUv-0.5);
  float value1 = pos.x;
float strenght = smoothstep(0.0,0.02,vUv.y - value1);

   // vec3 modelColour = mix(vec3(1.0), vec3(0.897,0.26,0.91),smoothstep(0.0,0.9, vPosition.y*40.0));
float st = clamp(abs(vPosition.x),0.0,1.0);
vec2 uv =  clamp(abs(vPosition.xz),0.0,1.0);


float t = clamp((vPosition.x * -vPosition.x * 0.16) + 0.15, 0., 1.);                         
  float y = abs(4.0 * -t + vPosition.z);
  float g = pow(y, 0.6);
                          
                          vec3 col = vec3(1.70, 1.48, 1.78);
                          col = col * -g + col; 
                          col = col * col;
  col = col * col;

    vec3 colour = clamp(abs(vPosition),0.0,1.0);
    vec3 modelColour = mix( vec3(0.897,0.26,0.91),vec3(1.0),pos.y);


  

  gl_FragColor = vec4(col,  1.0);


}`;
