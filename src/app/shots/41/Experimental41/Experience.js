import { Suspense, useRef } from "react";
import { Environment } from "@react-three/drei";
import React from "react";

import { OrbitControls, GradientTexture } from "@react-three/drei";

import { useThree, useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
import {
  DepthOfField,
  Bloom,
  EffectComposer,
} from "@react-three/postprocessing";

import HalfToneShading from "./HalfToneShading.js";
import LightingObject from "./Rose.js";
import Transparent from "./Transparent.js";

export default function Experience() {
  return (
    <>
      <OrbitControls enableDamping={true} />
      <color args={["black"]} attach="background" />
      {/* <GradientTexture
        stops={[0, 1.0]} // As many stops as you want
        colors={["#white", "#white"]} // Colors need to match the number of stops
        size={1024} // Size is optional, default = 1024
        attach="background"
      /> */}
      {/* <ambientLight intensity={1.0} /> */}
      <Suspense fallback={null}>
        <Transparent />
        {/* <HalfToneShading /> */}
      </Suspense>
    </>
  );
}
