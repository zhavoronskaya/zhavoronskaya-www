import { IShot } from "@/interfaces";

import particleFiber from "@/app/shots/particle-fiber/data";
import colorField from "@/app/shots/color-field/data";
import alienObject from "@/app/shots/alien-object/data";
import lineBezier from "@/app/shots/line-bezier/data";
import bathroom from "@/app/shots/bathroom/data";
import birds from "@/app/shots/birds/data";
import liquidImage from "@/app/shots/liquid-image/data";
import bloodySky from "@/app/shots/bloody-sky/data";
import pinkEllipses from "@/app/shots/pink-ellipses/data";
import psyPlane from "@/app/shots/psychedelic-plane/data";
import distortion from "@/app/shots/distortion/data";
import particlesTwist from "@/app/shots/particles-twist/data";
import mandelbrot from "@/app/shots/mandelbrot/data";
import pulsingBubble from "@/app/shots/pulsing-bubble/data";
import particlesCross from "@/app/shots/particles-cross/data";
import fractalTrees from "@/app/shots/fractal-trees/data";
import mushroom from "@/app/shots/mushroom/data";
import loveGeometry from "@/app/shots/love-geometry/data";
import moonSky from "@/app/shots/moon-sky/data";
import grid from "@/app/shots/grid/data";
import spaceShip from "@/app/shots/t-1000/data";
import alienFlower from "@/app/shots/alien-flower/data";
import snake from "@/app/shots/snake/data";
import shell from "@/app/shots/shell/data";
import coral from "@/app/shots/coral/data";
import cameo from "@/app/shots/cameo/data";
import mold from "@/app/shots/mold/data";
import paintedFlower from "@/app/shots/painted-flower/data";
import experimental from "@/app/shots/experimental/data";
import mush from "@/app/shots/mush/data";
import shellsea from "@/app/shots/shell-sea/data";
import mirrorsphere from "@/app/shots/mirror-sphere/data";
import harlem from "@/app/shots/harlem/data";
import experimentalshape from "@/app/shots/experimental-shape/data";
import experimentalshapeone from "@/app/shots/experimental-shape-one/data";
import experimentalshapetwo from "@/app/shots/experimental-shape-two/data";
import experimentalshapethree from "@/app/shots/experimental-shape-three/data";

import experimentalfour from "@/app/shots/experimental-four/data";
import experimentalfive from "@/app/shots/experimental-five/data";
import experimentalsix from "@/app/shots/experimental-six/data";
import experimentalseven from "@/app/shots/experimental-seven/data";
import experimentaleight from "@/app/shots/experimental-eight/data";
import experimentalnine from "@/app/shots/experimental-nine/data";
import sea from "@/app/shots/sea/data";
import realisticsea from "@/app/shots/sea-realistic/data";

import robot from "@/app/shots/robot/data";
import highVoltage from "@/app/shots/high-voltage/data";

import logoPage from "@/app/shots/logo-page/data";

export const shots: IShot[] = [
  particleFiber,
  colorField,
  alienObject,
  lineBezier,
  bathroom,
  birds,
  liquidImage,
  bloodySky,
  pinkEllipses,
  psyPlane,
  distortion,
  particlesTwist,
  mandelbrot,
  pulsingBubble,
  particlesCross,
  fractalTrees,
  mushroom,
  loveGeometry,
  moonSky,
  alienFlower,
  spaceShip,
  grid,
  snake,
  coral,
  shell,
  paintedFlower,
  cameo,
  mirrorsphere,
  mold,
  robot,
  mush,
  shellsea,

  experimental,
  experimentalshape,
  experimentalshapeone,
  experimentalshapetwo,
  experimentalshapethree,
  experimentalfour,
  experimentalfive,
  experimentalsix,
  experimentalseven,
  experimentaleight,
  experimentalnine,
  harlem,
  // realisticsea,
  // cameoSpiral,
  // logoPage,
  // highVoltage,
  // normalMap,
  // logoPage,

  // park,
  // sea,
].reverse();

export const galleryShots: Array<Array<{ size: number; shot: IShot }>> = [
  // [
  //   { size: 2, scene: particleFiber },
  //   { size: 1, scene: colorField },
  // ],
  [
    { size: 1, shot: shell },
    { size: 2, shot: snake },
  ],
  [{ size: 1, shot: paintedFlower }],
  [
    { size: 1, shot: mold },
    { size: 1, shot: cameo },
  ],
  [{ size: 1, shot: spaceShip }],

  // [
  //   { size: 4, scene: spaceShip },
  //   { size: 1, scene: moonSky },
  //   { size: 1, scene: alienFlower },
  // ],
  // [
  //   { size: 4, scene: alienObject },
  //   { size: 1, scene: lineBezier },
  //   { size: 2, scene: bathroom },
  // ],
  // [
  //   { size: 1, scene: birds },
  //   { size: 3, scene: liquidImage },
  //   { size: 4, scene: psyPlane },
  // ],
  // [
  //   { size: 2, scene: distortion },
  //   { size: 4, scene: particlesTwist },
  // ],
];
