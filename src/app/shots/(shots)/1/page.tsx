import { ShotPageLayoutDetailed } from "@/modules/shots/components/ShotPageLayout";
import rayMarging from "./data";
import { TechnologyLinks } from "@/constants";

type Props = {};

const Shot1 = ({}: Props) => {
  return (
    <ShotPageLayoutDetailed shot={rayMarging} id={"1"}>
      <a
        className=" text-accent-color hover:text-accent-color-active font-medium"
        target="_blank"
        rel="noopener noreferrer"
        href="https://en.wikipedia.org/wiki/Ray_marching"
      >
        Ray Marching
      </a>{" "}
      is a rendering technique used to generate complex, detailed scenes by
      iteratively &#39;marching&#39; a ray through a scene until it hits an
      object or reaches a predefined limit. ray marching calculates the distance
      from a point in space to the nearest surface (using a{" "}
      <a
        target="_blank"
        className=" text-accent-color hover:text-accent-color-active font-medium"
        rel="noopener noreferrer"
        href="https://iquilezles.org/articles/distfunctions/"
      >
        Signed Distance Function or SDF
      </a>{" "}
      ) and steps through space incrementally.
      <br />
      <br />
      In{" "}
      <a
        target="_blank"
        className=" text-accent-color hover:text-accent-color-active font-medium"
        rel="noopener noreferrer"
        href={TechnologyLinks.THREEJS}
      >
        Three.js
      </a>{" "}
      Ray Marching isn&#39;t a built-in feature, but you can implement it using
      custom shaders written in{" "}
      <a
        target="_blank"
        className=" text-accent-color hover:text-accent-color-active font-medium"
        rel="noopener noreferrer"
        href={TechnologyLinks.GLSL}
      >
        GLSL
      </a>
      .
    </ShotPageLayoutDetailed>
  );
};

export default Shot1;
