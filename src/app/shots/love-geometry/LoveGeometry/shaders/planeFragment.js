export default /*glsl */ `

#define PI 3.1415926535897932384626433832795


varying vec2 vUv;

uniform float uTime;
uniform vec2 uResolution;

mat2 rotate(float radians){
  float s = sin(radians);
  float c = cos(radians);
    return mat2(c,s,
                -s,c);
}

float stripes(vec2 p, float lineWidth){
    p = rotate(-PI/4.0 ) * p * 80.0;
    return step(.8,1.0 - smoothstep(.0,lineWidth,abs(sin(p.x*PI))));
}


void main() {

    vec2 pixelCoords = (vUv - 0.5) * uResolution;

    // pixelCoords.x *= ((uResolution.x/uResolution.y));

vec3 color = mix(vec3(0.5),vec3(0.069,0.0,0.0567),stripes(pixelCoords, 0.2));
gl_FragColor = vec4(vec3(color), 1.0);

}`;
