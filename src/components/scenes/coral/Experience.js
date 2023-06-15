import { Suspense, useRef } from "react";
import React from "react";

import { shaderMaterial, OrbitControls, Environment } from "@react-three/drei";

import coralVertexShader from "./shaders/vertex.js";
import coralFragmentShader from "./shaders/fragment.js";

import * as THREE from "three";
import { useFrame, extend } from "@react-three/fiber";

import {
  DepthOfField,
  Bloom,
  EffectComposer,
} from "@react-three/postprocessing";

const CoralMaterial = shaderMaterial(
  {
    uTime: 0,
  },

  coralVertexShader,
  coralFragmentShader
);
extend({ CoralMaterial });

function Coral() {
  const shaderRef = useRef();
  const geomertyRef = useRef();
  const ref = useRef();

  useFrame((state, delta) => {
    if (shaderRef.current) shaderRef.current.uTime += delta * 0.3;
    // ref.current.rotation.y += delta;
    // state.camera.fov = Math.sin(state.clock.getElapsedTime()) * 20 + 45;
    // state.camera.updateProjectionMatrix();
  });

  return (
    <mesh ref={ref}>
      <coneGeometry ref={geomertyRef} args={[2, 6, 512, 512, true]} />
      <coralMaterial side={THREE.DoubleSide} ref={shaderRef} />
    </mesh>
  );
}

export default function Experience() {
  return (
    <>
      <OrbitControls />
      {/* <EffectComposer>
        <DepthOfField
          focusDistance={0.025}
          focalLength={0.15}
          bokehScale={0.5}
        />
        <Bloom mipmapBlur intensity={0.2} luminanceThreshold={0} />
      </EffectComposer> */}

      {/* <color args={["#000000"]} attach="background" /> */}
      {/* <Environment preset="night" /> */}
      <Suspense fallback={null}>
        <Coral />
      </Suspense>
    </>
  );
}
