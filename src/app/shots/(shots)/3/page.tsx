import { ShotPageLayoutDetailed } from "@/modules/shots/components/ShotPageLayout";
import Geometry1 from "./data";

type Props = {};

const Shot3 = ({}: Props) => {
  return (
    <ShotPageLayoutDetailed shot={Geometry1} id={"3"}>
      A showcases featuring basic sphere geometry enhanced with shader material,
      demonstrating the power of shaders in creating dynamic, visually striking
      effects. The sphere&#39;s material, deformations, and lighting are all
      crafted within the shaders, using noise algorithms like domain warping and
      ridged FBM (
      <a
        target="_blank"
        className="text-accent-color hover:text-accent-color-active font-medium"
        rel="noopener noreferrer"
        href="https://en.wikipedia.org/wiki/Fractional_Brownian_motion"
      >
        Fractional Brownian Motion
      </a>
      ).
      <br />
      <br />
      These techniques add complexity and depth, transforming a simple shape
      into a vibrant, evolving form, highlighting the creative potential of
      shaders in generating sophisticated visual effects and textures.
    </ShotPageLayoutDetailed>
  );
};

export default Shot3;
