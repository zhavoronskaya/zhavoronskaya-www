import React from "react";
import { GetStaticPropsContext } from "next";

import { IScene } from "@/interfaces";
import { getScenes } from "@/db";
import ScenePageLayout from "@/components/scenes/ScenePageLayout";
import ColorField from "@/components/scenes/colorField";
import ParticleFiber from "@/components/scenes/particleFiber";
import AlienObject from "@/components/scenes/alienObject";
import LineBezier from "@/components/scenes/lineBezier";
import BathRoom from "@/components/scenes/bathRoom";
import Birds from "@/components/scenes/birds";
import LiquidImage from "@/components/scenes/imageLiquid";
import BloodySky from "@/components/scenes/bloodySky";
import PinkEllipses from "@/components/scenes/pinkEllipses";
import PsyPlane from "@/components/scenes/psyPlane";
import Distortion from "@/components/scenes/distortion";
import ParticlesTwist from "@/components/scenes/particlesTwist";
import Mandelbrot from "@/components/scenes/mandelbrot";
import PulsingBubble from "@/components/scenes/pulsingBubble";
import ParticlesSound from "@/components/scenes/particlesSound";
import FractalTrees from "@/components/scenes/fractalTrees";
import Mushroom from "@/components/scenes/mushroom";
import LoveGeometry from "@/components/scenes/loveGeometry";
import MoonSky from "@/components/scenes/moonSky";
import Grid from "@/components/scenes/grid";
import SpaceShip from "@/components/scenes/spaceShip";
import AlienFlower from "@/components/scenes/alienFlower";
import Snake from "@/components/scenes/snake";
import Shell from "@/components/scenes/shell";
import Coral from "@/components/scenes/coral";
import Cameo from "@/components/scenes/cameo";
import PaintedFlower from "@/components/scenes/paintedFlower";
import Mold from "@/components/scenes/mold";
import Sea from "@/components/scenes/sea";
import Robot from "@/components/scenes/robot";
import HighVoltage from "@/components/scenes/highVoltage";
// import CameoSpiral from "@/components/scenes/cameoSpiral";
// import NormalMap from "@/components/scenes/normalMap";
// import LogoPage from "@/components/scenes/logoPage";
// import MirrorSphere from "@/components/scenes/mirrorSphere";
// import Park from "@/components/scenes/park";

export async function getStaticPaths() {
  const scenes = await getScenes();
  const paths = scenes.map(({ slug }) => {
    return { params: { slug } };
  });

  return { paths, fallback: false };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const scenes = await getScenes();
  const slug = context?.params?.slug;
  const scene = scenes.find((scene) => scene.slug === slug);
  const sceneIdx = scenes.findIndex((scene) => scene.slug === slug);
  const prevSceneSlug = scenes[sceneIdx - 1]?.slug || null;
  const nextSceneSlug = scenes[sceneIdx + 1]?.slug || null;

  return { props: { scene, prevSceneSlug, nextSceneSlug } };
}

type Props = {
  scene: IScene;
  nextSceneSlug?: string;
  prevSceneSlug?: string;
};

const ScenePage = (props: Props) => {
  const { scene } = props;

  const Component = React.useMemo(() => {
    switch (scene.slug) {
      case "color-field":
        return ColorField;
      case "particle-fiber":
        return ParticleFiber;
      case "alien-object":
        return AlienObject;
      case "line-bezier":
        return LineBezier;
      case "bathroom":
        return BathRoom;
      case "birds":
        return Birds;
      case "liquid-image":
        return LiquidImage;
      case "bloody-sky":
        return BloodySky;
      case "pink-ellipses":
        return PinkEllipses;
      case "psychedelic-plane":
        return PsyPlane;
      case "distortion":
        return Distortion;
      case "particles-twist":
        return ParticlesTwist;
      case "mandelbrot":
        return Mandelbrot;
      case "pulsing-bubble":
        return PulsingBubble;
      case "particles-cross":
        return ParticlesSound;
      case "fractal-trees":
        return FractalTrees;
      case "mushroom":
        return Mushroom;
      case "love-geometry":
        return LoveGeometry;
      case "moon-sky":
        return MoonSky;
      case "grid":
        return Grid;
      case "alien-flower":
        return AlienFlower;
      case "t-1000":
        return SpaceShip;
      case "snake":
        return Snake;
      case "coral":
        return Coral;
      case "shell":
        return Shell;
      case "cameo":
        return Cameo;
      case "painted-flower":
        return PaintedFlower;
      case "mold":
        return Mold;
      case "sea":
        return Sea;
      case "robot":
        return Robot;
      case "high-voltage":
        return HighVoltage;
      // case "cameo-spiral":
      //   return CameoSpiral;
      // case "normal-map":
      //   return NormalMap;
      // case "logo-page":
      //   return LogoPage;
      // case "mirror-sphere":
      //   return MirrorSphere;
      // case "park":
      // return Park;
      default:
        return null;
    }
  }, [scene.slug]);

  if (!scene || !Component) return null;

  return (
    <ScenePageLayout
      scene={scene}
      nextSceneSlug={props.nextSceneSlug}
      prevSceneSlug={props.prevSceneSlug}
    >
      <Component />
    </ScenePageLayout>
  );
};

export default ScenePage;
