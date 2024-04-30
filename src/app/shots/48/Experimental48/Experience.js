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

import LightingObject from "./Rose.js";

export default function Experience() {
  return (
    <>
      <OrbitControls enableDamping={true} />
      <color args={["white"]} attach="background" />

      {/* <ambientLight intensity={1.0} /> */}
      <Suspense fallback={null}>
        <LightingObject visible={true} />
      </Suspense>
    </>
  );
}
