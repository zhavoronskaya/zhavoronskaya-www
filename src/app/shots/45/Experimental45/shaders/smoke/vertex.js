export default /*glsl */ `

varying vec2 vUv;

uniform sampler2D uSmokeTexture;
uniform float uTime;


vec2 rotate2D(vec2 value, float angle)
{
    float s = sin(angle);
    float c = cos(angle);
    mat2 m = mat2(c, s, -s, c);
    return m * value;
}



void main()
{
    vec3 newPosition = position;



    //Rotate 
    //pick up random value from noise texture
    float anglePerlin = texture2D(uSmokeTexture, vec2(uv.x*0.2 - uTime * 0.1,0.5)).r;
    anglePerlin *=10.0;

    newPosition.yz=rotate2D(newPosition.yz,anglePerlin);
    

    //offset +/- value substract 0.5
    vec2 offset = vec2(
        texture(uSmokeTexture, vec2( uv.x*0.1 - uTime * 0.1,0.25)).r- 0.5,
        texture(uSmokeTexture, vec2( uv.x*0.1 - uTime * 0.1,0.75)).r - 0.5
    );
    offset *=pow(uv.x, 4.0)* 10.0;
    newPosition.yz += offset;



    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    vUv = uv;
} `;
