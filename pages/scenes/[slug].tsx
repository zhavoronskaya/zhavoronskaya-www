import React from "react";
import Head from "next/head";
import { GetStaticPropsContext } from "next";

import { IScene } from "../../src/interfaces";
import db from "../../src/db";
import ScenePageLayout from "../../src/components/scenes/ScenePageLayout";
import ColorField from "../../src/components/scenes/psyhoColorField";
import ParticleFiber from "../../src/components/scenes/particleFiber";
import alienObject from "../../src/components/scenes/alienObject";
import lineBezier from "../../src/components/scenes/lineBezier";
import bathRoom from "../../src/components/scenes/bathRoom";
import birds from "../../src/components/scenes/birds";

export async function getStaticPaths() {
  const paths = db.scenes.map(({ slug }) => {
    return { params: { slug } };
  });

  return { paths, fallback: false };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const slug = context?.params?.slug;
  const scene = db.scenes.find((scene) => scene.slug === slug);
  const sceneIdx = db.scenes.findIndex((scene) => scene.slug === slug);
  const prevSceneSlug = db.scenes[sceneIdx - 1]?.slug || null;
  const nextSceneSlug = db.scenes[sceneIdx + 1]?.slug || null;

  return { props: { scene, prevSceneSlug, nextSceneSlug } };
}

type Props = {
  scene: IScene;
  nextSceneSlug?: string;
  prevSceneSlug?: string;
};

export default function ScenePage(props: Props) {
  const { scene } = props;

  const Component = React.useMemo(() => {
    switch (scene.slug) {
      case "color-field":
        return ColorField;
      case "particle-fiber":
        return ParticleFiber;
      case "alien-object":
        return alienObject;
      case "line-bezier":
        return lineBezier;
      case "bathroom":
        return bathRoom;
      case "birds":
        return birds;
      default:
        return () => <></>;
    }
  }, [scene.slug]);

  return (
    <>
      <Head>
        <title>Zhavoronskaya</title>
        <meta name="description" content="Artist portfolio" />
        <link rel="icon" href="/Zhavoronok.ico" />
      </Head>

      {scene && (
        <ScenePageLayout
          scene={scene}
          nextSceneSlug={props.nextSceneSlug}
          prevSceneSlug={props.prevSceneSlug}
        >
          <Component />
        </ScenePageLayout>
      )}
    </>
  );
}
