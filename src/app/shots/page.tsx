import Link from "next/link";

import { getShots } from "@/db";
import LogoSideBarScene from "@/components/scenes/ZhavoronskayaPlaneVertical";
import BaseLayout from "@/theme/components/LayoutBaseV0";
import ShotThumbnail from "@/components/shots/ShotThumbnail";

import styles from "./page.module.css";
import Container from "@/theme/components/Container";

export default async function ShotsPage() {
  const shots = await getShots();

  return (
    <Container maxWidth="700px">
      <h2 className="fixed top-4 fz-lg text-ellipsis">
        Gallery of generative art works
      </h2>
      <div className={styles.albumscontainer}>
        {shots.map((shot) => {
          return <ShotThumbnail key={shot.name} shot={shot} />;
        })}
      </div>
    </Container>
  );
}
