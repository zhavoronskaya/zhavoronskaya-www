import { IShot } from "@/interfaces";
import LogoSideBarScene from "@/components/scenes/ZhavoronskayaPlaneVertical";
import BaseLayout from "@/theme/components/LayoutBaseV0";
import ShotHeader from "./ShotHeader";
import Container from "@/theme/components/Container";

type Props = {
  shot: IShot;
  nextShotSlug?: string;
  prevShotSlug?: string;
  children: React.ReactNode;
};

export default function ShotPageLayout(props: Props) {
  return (
    <Container className="h-full">
      <div className="fixed top-4 fz-lg">
        <ShotHeader
          shot={props.shot}
          nextShotSlug={props.nextShotSlug}
          prevShotSlug={props.prevShotSlug}
        />
      </div>

      {props.children}
    </Container>
  );
}
