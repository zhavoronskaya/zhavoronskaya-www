import { IShot } from "@/interfaces";
import LogoSideBarScene from "@/theme/components/LogoSideBar";
import BaseLayout from "@/theme/components/BaseLayout";
import ShotHeader from "./ShotHeader";

type Props = {
  shot: IShot;
  nextShotSlug?: string;
  prevShotSlug?: string;
  children: React.ReactNode;
};

export default function ShotPageLayout(props: Props) {
  return (
    <BaseLayout
      sidebar={<LogoSideBarScene />}
      contentMaxWidth="100%"
      contentHeader={
        <ShotHeader
          shot={props.shot}
          nextShotSlug={props.nextShotSlug}
          prevShotSlug={props.prevShotSlug}
        />
      }
    >
      {props.children}
    </BaseLayout>
  );
}
