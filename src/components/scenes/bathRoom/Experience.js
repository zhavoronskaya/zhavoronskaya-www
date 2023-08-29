import { Suspense, useEffect, useRef, useState } from "react";
import React from "react";

import {
  shaderMaterial,
  OrbitControls,
  Stage,
  Environment,
  PresentationControls,
} from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";

import Model from "./components/Model";
import Mirror from "./components/Mirror";
import Back from "./components/Back";

import {
  DepthOfField,
  Bloom,
  EffectComposer,
} from "@react-three/postprocessing";

export default function Experience() {
  useFrame((state, delta) => {
    const angle = state.clock.elapsedTime;
    state.camera.position.x =
      Math.abs(Math.sin((angle * Math.PI) / 70) / 1.4) * 11.5;
    state.camera.position.z =
      Math.abs(Math.cos((angle * Math.PI) / 70) / 1.4) * 11.5;
    state.camera.position.y =
      Math.abs(Math.sin((angle * Math.PI) / 70) / 1.4) * 11.5;
    state.camera.lookAt(1, 4.5, -3);
    state.camera.updateProjectionMatrix();
  });
  return (
    <>
      {/* <OrbitControls /> */}

      {/* <color args={["#F3CBFE"]} attach="background" />
      <EffectComposer multisampling={4}>
        <DepthOfField
          focusDistance={0.025}
          focalLength={0.55}
          bokehScale={10}
        />
        <Bloom mipmapBlur intensity={0.2} luminanceThreshold={1} />
      </EffectComposer> */}

      {/* <Environment preset="sunset"></Environment> */}
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        <Model />

        <Mirror />
        <Back />
      </Suspense>
    </>
  );
}
