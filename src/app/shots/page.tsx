import Link from "next/link";

import { getShots } from "@/db";
import LogoSideBarScene from "@/theme/components/LogoSideBar";
import BaseLayout from "@/theme/components/BaseLayout";
import ShotThumbnail from "@/components/shots/ShotThumbnail";

import styles from "./page.module.css";

export default async function ShotsPage() {
  const shots = await getShots();

  return (
    <BaseLayout
      contentMaxWidth="700px"
      sidebar={<LogoSideBarScene />}
      contentHeader={
        <h2 className="text-ellipsis">Gallery of generative art works</h2>
      }
    >
      <div className={styles.albumscontainer}>
        {shots.map((shot) => {
          return <ShotThumbnail key={shot.name} shot={shot} />;
        })}
      </div>
    </BaseLayout>
  );
}
