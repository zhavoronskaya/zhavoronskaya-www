import { ShotPageLayoutDetailed } from "@/modules/shots/components/ShotPageLayout";
import FBO1 from "./data";

type Props = {};

const Shot11 = ({}: Props) => {
  return (
    <ShotPageLayoutDetailed shot={FBO1} id={"11"}>
      In Three.js, an{" "}
      <a
        target="_blank"
        className="text-accent-color hover:text-accent-color-active font-medium"
        rel="noopener noreferrer"
        href="https://threejs.org/docs/#api/en/textures/FramebufferTexture"
      >
        FBO
      </a>{" "}
      (Frame Buffer Object) is a powerful tool for rendering scenes or elements
      off-screen, which can then be used as textures or for post-processing.
      This technique is essential for creating complex visual effects.
      <br />
      <br />
      These showcases use FBOs with particle flow fields to create mesmerizing
      visual effects. By rendering the flow field off-screen, they enable
      complex and beautiful scenes with hundreds of thousands of particles while
      minimizing GPU load.
    </ShotPageLayoutDetailed>
  );
};

export default Shot11;
