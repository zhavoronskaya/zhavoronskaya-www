import { BlendFunction, Effect } from "postprocessing";
import { Uniform } from "three";

const fragmentShader = /* glsl */ `  
    // uniform float frequency;
    // uniform float amplitude;
    // uniform float offset;

    uniform vec2 uMouse;

    uniform sampler2D uDiffuse;
    uniform vec2 uResolution;

    float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
          uv -= disc_center;
          uv*=uResolution;
          float dist = sqrt(dot(uv, uv));
          return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
        }

void mainUv(inout vec2 uv)
{
    //uv.y += sin(uv.x * frequency+offset*0.5) * amplitude*sin(uMouse.x*frequency);
    float c = -circle(uv, uMouse, 0.0, 0.2);
    uv+=c*.5;
    uv = mix(uv, uMouse, c * 3.99);
}



void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor)
{
    // outputColor = vec4(uv, 1.0, 1.0); 
    // vec4 color = inputColor;
    // color.rgb *= vec3(0.8, 1.0, 0.5);
    // outputColor = color;




            
            // float c = circle(uv, uMouse, 0.3, 0.2);
            // vec2 newUv = uv + c*1.1;
            float r = texture2D(uDiffuse, uv).x;
            float g = texture2D(uDiffuse, uv).y;
            float b = texture2D(uDiffuse, uv).z;
            vec4 color = vec4(r, g, b, 1.);

        color = vec4(texture2D(uDiffuse,uv) + texture2D(uDiffuse,uv)*vec4(vec3(0.7),1.));



    outputColor = color;
}`;

export default class PostEffect extends Effect {
  constructor({
    uMouse,
    uDiffuse,
    uResolution,
    // frequency,
    // amplitude,
    blendFunction = BlendFunction.DARKEN,
  }) {
    super("PostEffect", fragmentShader, {
      uniforms: new Map([
        // ["frequency", { value: frequency }],
        // ["amplitude", { value: amplitude }],
        ["uMouse", new Uniform(uMouse)],
        ["uResolution", new Uniform(uResolution)],
        ["uDiffuse", new Uniform(uDiffuse)],
        // ["frequency", new Uniform(frequency)],
        // ["amplitude", new Uniform(amplitude)],
        // ["offset", new Uniform(0)],
      ]),
      blendFunction: blendFunction,
    });
    // console.log(props);
    // console.log(frequency, amplitude, uMouse);
  }

  //   update(renderer, inputBuffer, deltaTime) {
  //     console.log(
  //       "renderer, inputBuffer, deltaTime",
  //       renderer,
  //       inputBuffer,
  //       deltaTime
  //     );
  //     // this.uniforms.get("offset").value += deltaTime;
  //   }
}
