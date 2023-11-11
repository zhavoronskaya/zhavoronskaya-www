import { Suspense, useEffect, useRef, useState } from "react";
import React from "react";

import {
  shaderMaterial,
  OrbitControls,
  Stage,
  Environment,
  PresentationControls,
  Sky,
  Stars,
  Sparkles,
} from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";

import Model from "./components/Model";

import {
  DepthOfField,
  Bloom,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

export default function Experience() {
  // useFrame((state, delta) => {
  //   const angle = state.clock.elapsedTime;
  //   state.camera.position.x =
  //     Math.abs(Math.sin((angle * Math.PI) / 70) / 1.4) * 11.5;
  //   state.camera.position.z =
  //     Math.abs(Math.cos((angle * Math.PI) / 70) / 1.4) * 11.5;
  //   state.camera.position.y =
  //     Math.abs(Math.sin((angle * Math.PI) / 70) / 1.4) * 11.5;
  //   state.camera.lookAt(1, 4.5, -3);
  //   state.camera.updateProjectionMatrix();
  // });
  return (
    <>
      <OrbitControls />

      <color args={["#115978"]} attach="background" />
      <EffectComposer multisampling={4}>
        <DepthOfField
          focusDistance={0}
          focalLength={0.02}
          bokehScale={2}
          height={480}
        />
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} />
        <Noise opacity={0.2} />
        <Vignette eskil={false} offset={0.1} darkness={1.0} />
      </EffectComposer>
      <Sparkles size={5} scale={[40, 40, 40]} speed={10} count={1000} />
      {/* <Sky distance={450000} inclination={0} azimuth={0.25} /> */}
      {/* <Stars
        radius={10}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      /> */}

      {/* <Environment preset="sunset"></Environment> */}
      <Suspense fallback={null}>
        <Model />
      </Suspense>
    </>
  );
}
