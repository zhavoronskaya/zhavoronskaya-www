import { getScenes } from "@/db";
import { IScene } from "@/interfaces";
import ScenesPageLayout from "@/components/scenes/ScenesPageLayout";
import SceneThumbnail from "@/components/scenes/SceneThumbnail";

export async function getStaticProps() {
  const scenes = await getScenes();
  const props = { scenes };
  return { props };
}

type Props = {
  scenes: IScene[];
};

export default function GalleryPage({ scenes }: Props) {
  return (
    <ScenesPageLayout>
      {scenes.map((scene) => {
        return <SceneThumbnail key={scene.name} scene={scene} />;
      })}
    </ScenesPageLayout>
  );
}
