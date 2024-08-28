import { ShotPageLayoutDetailed } from "@/modules/shots/components/ShotPageLayout";
import particles from "./data";
import { TechnologyLinks } from "@/constants";

type Props = {};

const Shot17 = ({}: Props) => {
  return (
    <ShotPageLayoutDetailed shot={particles} id={"17"}>
      This series of experiments combines{" "}
      <a
        target="_blank"
        className="text-accent-color hover:text-accent-color-active font-medium"
        rel="noopener noreferrer"
        href="https://github.com/pmndrs/drei/blob/master/src/core/MeshTransmissionMaterial.tsx"
      >
        Transmission Material
      </a>{" "}
      from{" "}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/pmndrs/drei?tab=readme-ov-file#meshtransmissionmaterial"
        className="text-accent-color hover:text-accent-color-active font-medium"
      >
        React Three Drei
      </a>{" "}
      with 3D models created in{" "}
      <a
        className=" text-accent-color hover:text-accent-color-active font-medium"
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.blender.org/"
      >
        Blender3D
      </a>
      . Before compilation, the transmission material is used to create
      deformations in some cases.
      <br />
      <br />
      The experiments reveal how the material interacts with the detailed
      models, resulting in stunning visual effects and realistic glass-like
      appearances.
    </ShotPageLayoutDetailed>
  );
};

export default Shot17;
