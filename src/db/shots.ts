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

import mush from "@/app/shots/mush/data";
import shellsea from "@/app/shots/shell-sea/data";
import mirrorsphere from "@/app/shots/mirror-sphere/data";
import harlem from "@/app/shots/harlem/data";

import experimental1 from "@/app/shots/1/data";
import experimental2 from "@/app/shots/2/data";
import experimental3 from "@/app/shots/3/data";
import experimental4 from "@/app/shots/4/data";
import experimental5 from "@/app/shots/5/data";
import experimental6 from "@/app/shots/6/data";
import experimental7 from "@/app/shots/7/data";

import experimental8 from "@/app/shots/8/data";
import experimental9 from "@/app/shots/9/data";
import experimental10 from "@/app/shots/10/data";
import experimental11 from "@/app/shots/11/data";
import experimental12 from "@/app/shots/12/data";
import experimental13 from "@/app/shots/13/data";
import experimental14 from "@/app/shots/14/data";
import experimental15 from "@/app/shots/15/data";
import experimental16 from "@/app/shots/16/data";
import experimental17 from "@/app/shots/17/data";
import experimental18 from "@/app/shots/18/data";
import experimental19 from "@/app/shots/19/data";
import experimental20 from "@/app/shots/20/data";
import experimental21 from "@/app/shots/21/data";
import experimental22 from "@/app/shots/22/data";
import experimental23 from "@/app/shots/23/data";
import experimental24 from "@/app/shots/24/data";
import experimental25 from "@/app/shots/25/data";
import experimental26 from "@/app/shots/26/data";
import experimental27 from "@/app/shots/27/data";
import experimental28 from "@/app/shots/28/data";
import experimental29 from "@/app/shots/29/data";
import experimental30 from "@/app/shots/30/data";
import experimental31 from "@/app/shots/31/data";
import experimental32 from "@/app/shots/32/data";
import experimental33 from "@/app/shots/33/data";
import experimental34 from "@/app/shots/34/data";
import experimental35 from "@/app/shots/35/data";
import experimental36 from "@/app/shots/36/data";
import experimental37 from "@/app/shots/37/data";
import experimental38 from "@/app/shots/38/data";
import experimental39 from "@/app/shots/39/data";
import experimental40 from "@/app/shots/40/data";
import experimental41 from "@/app/shots/41/data";
import experimental42 from "@/app/shots/42/data";
import experimental43 from "@/app/shots/43/data";
import experimental44 from "@/app/shots/44/data";
import experimental45 from "@/app/shots/45/data";
import experimental46 from "@/app/shots/46/data";
import experimental47 from "@/app/shots/47/data";
import experimental48 from "@/app/shots/48/data";
import sea from "@/app/shots/sea/data";
import realisticsea from "@/app/shots/sea-realistic/data";
import wait from "@/app/shots/wait-forever/data";

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

  experimental1,
  experimental2,
  experimental3,
  experimental4,
  experimental5,
  experimental6,
  experimental7,
  experimental8,
  experimental9,
  experimental10,
  experimental11,
  harlem,
  wait,
  realisticsea,
  experimental12,
  experimental13,
  experimental14,
  experimental15,
  experimental16,
  experimental17,
  experimental18,
  experimental19,
  experimental20,
  experimental21,
  experimental22,
  experimental45,
  // experimental23,
  experimental24,
  experimental25,
  experimental26,
  experimental27,
  experimental28,
  experimental29,
  experimental30,
  experimental31,
  experimental32,
  // experimental33,
  experimental34,
  // experimental35,
  // experimental36,
  // experimental37,
  // experimental38,
  // experimental39,
  // experimental40,
  experimental41,
  experimental42,
  experimental43,
  experimental44,
  experimental48,
  // experimental46,
  // experimental47,
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
    { size: 1, shot: experimental9 },
    { size: 3, shot: experimental10 },
    { size: 2, shot: experimental1 },
  ],
  [
    { size: 2, shot: experimental4 },
    { size: 1, shot: experimental6 },
  ],
  [{ size: 1, shot: paintedFlower }],
  // [
  //   { size: 3, shot: wait },
  //   { size: 2, shot: harlem },
  // ],
  [
    { size: 1, shot: mold },
    { size: 1, shot: cameo },
  ],

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
