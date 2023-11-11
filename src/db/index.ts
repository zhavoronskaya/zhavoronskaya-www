import particleFiber from "./scenes/particle-fiber";
import colorField from "./scenes/color-field";
import alienObject from "./scenes/alien-object";
import lineBezier from "./scenes/line-bezier";
import bathroom from "./scenes/bathroom";
import birds from "./scenes/birds";
import liquidImage from "./scenes/liquid-image";
import bloodySky from "./scenes/bloody-sky";
import pinkEllipses from "./scenes/pink-ellipses";
import psyPlane from "./scenes/psychedelic-plane";
import distortion from "./scenes/distortion";
import particlesTwist from "./scenes/particles-twist";
import mandelbrot from "./scenes/mandelbrot";
import pulsingBubble from "./scenes/pulsing-bubble";
import particlesCross from "./scenes/particles-cross";
import fractalTrees from "./scenes/fractal-trees";
import mushroom from "./scenes/mushroom";
import loveGeometry from "./scenes/love-geometry";
import moonSky from "./scenes/moon-sky";
import grid from "./scenes/grid";
import spaceShip from "./scenes/t-1000";
import alienFlower from "./scenes/alien-flower";
import snake from "./scenes/snake";
import shell from "./scenes/shell";
import coral from "./scenes/coral";
import cameo from "./scenes/cameo";
import mold from "./scenes/mold";
import paintedFlower from "./scenes/painted-flower";
import experimental from "./scenes/experimental";
import mush from "./scenes/mush";
import shellsea from "./scenes/shell-sea";

import robot from "./scenes/robot";
import highVoltage from "./scenes/high-voltage";

import logoPage from "./scenes/logo-page";

import whiteHalf from "./albums/white-half";
import idreamed from "./albums/i-dream-in-dreams";
import twilight from "./albums/twilight-crystal";
import reality from "./albums/reality";
import pcp from "./albums/pcp";
import goneBeyond from "./albums/gone-beyond";
import sputnik from "./albums/sputnik";
import sxema from "./albums/sxema";
import states from "./albums/states";

export async function getSelectedAlbums() {
  return [states, idreamed, whiteHalf, twilight];
}
export async function getAlbums() {
  return [
    states,
    whiteHalf,
    twilight,
    idreamed,
    reality,
    pcp,

    goneBeyond,
    sputnik,
    sxema,
  ];
}

export async function getScenes() {
  const scenes = [
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
    mold,
    robot,
    // experimental,
    mush,
    shellsea,
    // cameoSpiral,
    // logoPage,
    // highVoltage,
    // normalMap,
    // logoPage,
    // mirrorSphere,
    // park,
    // sea,
  ];
  return scenes.reverse();
}

export async function getGalleryScenes() {
  return [
    // [
    //   { size: 2, scene: particleFiber },
    //   { size: 1, scene: colorField },
    // ],
    [
      { size: 1, scene: shell },
      { size: 2, scene: snake },
    ],
    [{ size: 1, scene: paintedFlower }],
    [
      { size: 1, scene: mold },
      { size: 1, scene: cameo },
    ],
    [{ size: 1, scene: spaceShip }],

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
}
