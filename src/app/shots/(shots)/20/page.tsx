import { ShotPageLayoutDetailed } from "@/modules/shots/components/ShotPageLayout";
import rose from "./data";

type Props = {};

const Shot20 = ({}: Props) => {
  return (
    <ShotPageLayoutDetailed shot={rose} id={"20"}>
      This collection showcases the use of Perlin noise to deform objects and
      generate unique logos and abstract art.
      <br />
      <br />
      By applying{" "}
      <a
        target="_blank"
        className="text-accent-color hover:text-accent-color-active font-medium"
        rel="noopener noreferrer"
        href="https://en.wikipedia.org/wiki/Perlin_noise"
      >
        Perlin noise
      </a>
      , intricate patterns and organic transformations are achieved, adding
      dynamic, natural-looking distortions to geometric shapes and designs. The
      results highlight the versatility of noise functions in creating visually
      compelling effects, from fluid, organic forms to striking, imaginative
      graphics.
    </ShotPageLayoutDetailed>
  );
};

export default Shot20;
