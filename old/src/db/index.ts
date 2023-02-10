import particleFiber from "./scenes/particle-fiber";
import colorField from "./scenes/color-field";
import alienObject from "./scenes/alien-object";
import lineBezier from "./scenes/line-bezier";
import bathroom from "./scenes/bathroom";
import birds from "./scenes/birds";

import whiteHalf from "./albums/white-half";
import idreamed from "./albums/i-dream-in-dreams";
import twilight from "./albums/twilight-crystal";
import reality from "./albums/reality";
import pcp from "./albums/pcp";
import goneBeyond from "./albums/gone-beyond";
import sputnik from "./albums/sputnik";
import sxema from "./albums/sxema";


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
  ]
}

export async function getScenes() {
  return [particleFiber, colorField, alienObject, lineBezier, bathroom, birds]
}


