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
  return [
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
  ];
}

export async function getGalleryScenes() {
  return [
    [
      { size: 2, scene: particleFiber },
      { size: 1, scene: colorField },
    ],
    [
      { size: 4, scene: alienObject },
      { size: 1, scene: lineBezier },
      { size: 2, scene: bathroom },
    ],
    [
      { size: 1, scene: birds },
      { size: 3, scene: liquidImage },
      { size: 4, scene: psyPlane },
    ],
    [
      { size: 1, scene: distortion },
      { size: 3, scene: particlesTwist },
    ],
  ];
}
