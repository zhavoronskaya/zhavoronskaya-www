import { Suspense, useRef } from "react";
import { Environment } from "@react-three/drei";
import React from "react";

import { OrbitControls } from "@react-three/drei";

import { useThree, useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
import {
  DepthOfField,
  Bloom,
  EffectComposer,
} from "@react-three/postprocessing";

import LightingObject from "./LightingObject.js";

export default function Experience() {
  return (
    <>
      <OrbitControls enableDamping={true} />

      <Suspense fallback={null}>
        <LightingObject />
      </Suspense>
    </>
  );
}
