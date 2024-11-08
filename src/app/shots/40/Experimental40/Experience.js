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
import Particles from "./Particle.js";
import MorphingParticles from "./MorphingParticles.js";

export default function Experience({ onDectroy, fireworks }) {
  return (
    <>
      <OrbitControls enableDamping={true} />

      <Suspense fallback={null}>
        {fireworks.map((firework) => {
          return (
            <Particles key={firework.id} {...firework} onDestroy={onDectroy} />
          );
        })}
        <MorphingParticles />
      </Suspense>
    </>
  );
}
