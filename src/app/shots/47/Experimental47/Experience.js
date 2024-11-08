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
import { ScrollControls } from "@react-three/drei";
import Particles from "./Particle.js";
import MorphingParticles from "./MorphingParticles.js";

export default function Experience() {
  return (
    <>
      {" "}
      <ScrollControls pages={1}>
        {/* <OrbitControls enableDamping={true} /> */}
        <color args={["#edc8fa"]} attach="background" />

        <Suspense fallback={null}>
          <MorphingParticles />
        </Suspense>
      </ScrollControls>
    </>
  );
}
