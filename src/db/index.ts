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

import whiteHalf from "./albums/white-half";
import idreamed from "./albums/i-dream-in-dreams";
import twilight from "./albums/twilight-crystal";
import reality from "./albums/reality";
import pcp from "./albums/pcp";
import goneBeyond from "./albums/gone-beyond";
import sputnik from "./albums/sputnik";
import sxema from "./albums/sxema";

export async function getSelectedAlbums() {
  return [twilight, whiteHalf, idreamed];
}
export async function getAlbums() {
  return [
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
  ];
}
