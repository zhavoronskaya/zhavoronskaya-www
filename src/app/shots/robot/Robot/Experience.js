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

import Model from "./Model.js";

export default function Experience() {
  useFrame((state, delta) => {});
  return (
    <>
      <OrbitControls
      // onEnd={(e) => console.log(e.target.object.position.toArray())}
      />

      {/* <EffectComposer multisampling={4}>
        <DepthOfField
          focusDistance={0.025}
          focalLength={0.55}
          bokehScale={10}
        />
        <Bloom mipmapBlur intensity={0.2} luminanceThreshold={1} />
      </EffectComposer> */}

      {/* <Environment preset="sunset"></Environment> */}
      {/* <color args={["#000000"]} attach="background" /> */}

      <Suspense fallback={"LOADING"}>
        <Model url="/music/track10.mp3" rotation={[0, (3 * Math.PI) / 2, 0]} />
      </Suspense>
    </>
  );
}
