export default /*glsl */ `

uniform float uTime;
uniform sampler2D uTex;
uniform sampler2D uDiffuse;
uniform vec3 uResolution;



varying float vElevation;
varying vec2 vUv;
varying vec3 vPosition;


void main() {


    // vec3 color = texture2D(uTex, vUv + vElevation).rgb;
    // gl_FragColor = vec4(color, 1.0);
    vec3 p =vPosition;
    vec4 I;
    
    float   M    ,           
            A    , 
            T    = uTime,
            R    ;
    for(    I    *= R; R++ < 66.;) { 
    vec4    X    = uResolution.xyzz, 
    
        p = A * normalize(vec4((vUv+vUv-X.xy) * 
                      mat2(sin(A*sin(0*.1)*3.3 + vec4(0,33,11,0))), X.y, 0));
        p.z += T;
        p.y = abs(abs(p.y) - 1.);
        
        X = fract(dot(X=ceil(p*4.), cos(X)) + X);
        X.g += 4.;
        M = 4.*pow(smoothstep(1.,.5, 
                       texture2D(uTex,vUv*10.0).w),1000.)-5.;
        
        A += p.y*.6 - (M+A+A+3.)/67.;
        
        I += (X.a + .5) * (X + A) * ( 1.4 - p.y ) / 2e2 / M / M / exp(A*.1);
    // I = texture2D(uTex, (p.xz+ceil(T+X.x))/64.);
    }

    vec4 color = texture2D(uTex, vUv);
    vec4 normalSample = (texture2D(uDiffuse, vUv));
  
  gl_FragColor = mix(color, I, I.w);
 //   gl_FragColor = vec4(I);

}`;
