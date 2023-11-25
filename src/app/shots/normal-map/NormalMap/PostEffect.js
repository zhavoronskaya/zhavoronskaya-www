import { BlendFunction, Effect } from "postprocessing";
import { Uniform } from "three";

const fragmentShader = /* glsl */ `  

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
    float c = -circle(uv, uMouse, 0.0, 0.1);
    uv+=c*.5;
    uv = mix(uv, uMouse, c * 1.99);
}



void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor)
{
    // outputColor = vec4(uv, 1.0, 1.0); 
    // vec4 color = inputColor;
    // color.rgb *= vec3(0.8, 1.0, 0.5);
    // outputColor = color;


            float r = texture2D(uDiffuse, uv).x ;
            float g = texture2D(uDiffuse, uv).y;
            float b = texture2D(uDiffuse, uv).z ;
            vec4 color = vec4(r, g, b, 1.);

    


    outputColor = color;
}`;

export default class PostEffect extends Effect {
  constructor({
    uMouse,
    uDiffuse,
    uResolution,
    blendFunction = BlendFunction.SCREEN,
  }) {
    super("PostEffect", fragmentShader, {
      uniforms: new Map([
        ["uMouse", new Uniform(uMouse)],
        ["uResolution", new Uniform(uResolution)],
        ["uDiffuse", new Uniform(uDiffuse)],
      ]),
      blendFunction: blendFunction,
    });
    // console.log(props);
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
