import { ShotPageLayoutDetailed } from "@/modules/shots/components/ShotPageLayout";
import particles from "./data";
import { TechnologyLinks } from "@/constants";

type Props = {};

const Shot8 = ({}: Props) => {
  return (
    <ShotPageLayoutDetailed shot={particles} id={"8"}>
      Showcases present a series of particle system experiments in Three.js,
      focusing on positioning particles using vertex shaders and creating
      stunning visuals with fragment shaders.
      <br />
      <br />
      <a
        className=" text-accent-color hover:text-accent-color-active font-medium"
        target="_blank"
        rel="noopener noreferrer"
        href="https://threejs.org/docs/#api/en/objects/Points"
      >
        Particles
      </a>{" "}
      in Three.js are typically small sprites or points that can be controlled
      and animated individually or as a group to create a wide variety of
      effects.
    </ShotPageLayoutDetailed>
  );
};

export default Shot8;
