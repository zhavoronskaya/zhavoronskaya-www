import Head from "next/head";

import ScenesPageLayout from "../../src/components/scenes/ScenesPageLayout";
import SceneThumbnail from "../../src/components/scenes/SceneThumbnail";
import db from "../../src/db";

export default function GalleryPage() {
  return (
    <>
      <Head>
        <title>Zhavoronskaya</title>
        <meta name="description" content="Artist portfolio" />
        <link rel="icon" href="/Zhavoronok.ico" />
      </Head>

      <ScenesPageLayout>
        {db.scenes.map((scene) => {
          return <SceneThumbnail key={scene.name} scene={scene} />;
        })}
      </ScenesPageLayout>
    </>
  );
}
