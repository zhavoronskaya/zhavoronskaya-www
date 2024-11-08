import {
  shaderMaterial,
  OrbitControls,
  useFBO,
  useGLTF,
  MeshTransmissionMaterial,
  GradientTexture,
} from "@react-three/drei";

import { Suspense, useRef, useEffect } from "react";
import React from "react";

import {
  DepthOfField,
  EffectComposer,
  Vignette,
  Bloom,
} from "@react-three/postprocessing";

import FBOParticlesBush from "./Bush.js";
import FBOParticlesFLower from "./Flower.js";

export default function Experience() {
  return (
    <>
      <OrbitControls />
      {/* <EffectComposer multisampling={2}>
        <DepthOfField
          focusDistance={0.8}
          focalLength={0.08}
          bokehScale={0}
          height={480}
        />
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} />
        <Vignette eskil={false} offset={0.0} darkness={1.0} />
      </EffectComposer> */}

      {/* <color args={["#02241a"]} attach="background" /> */}
      <ambientLight intensity={20.0} color={"#a799ba"} />
      {/* <color args={["#371f40"]} attach="background" /> */}
      {/* <color args={["#0d0109"]} attach="background" /> */}
      {/* 
      <color args={["#605263"]} attach="background" /> */}

      {/* <color args={["#051524"]} attach="background" /> */}
      <Suspense fallback={null}>
        <FBOParticlesBush />
        <FBOParticlesFLower />
      </Suspense>
    </>
  );
}
