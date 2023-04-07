import { Suspense, useRef } from "react";
import React from "react";

import { shaderMaterial, OrbitControls, Environment } from "@react-three/drei";

import flowerVertexShader from "./shaders/vertex.js";
import flowerFragmentShader from "./shaders/fragment.js";

import * as THREE from "three";
import { useFrame, extend } from "@react-three/fiber";

import {
  DepthOfField,
  Bloom,
  EffectComposer,
} from "@react-three/postprocessing";

const FlowerMaterial = shaderMaterial(
  {
    uTime: 0,
  },

  flowerVertexShader,
  flowerFragmentShader
);
extend({ FlowerMaterial });

function AlienFlower() {
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
      <icosahedronGeometry ref={geomertyRef} args={[2, 128]} />
      <flowerMaterial ref={shaderRef} />
    </mesh>
  );
}

export default function Experience() {
  return (
    <>
      <OrbitControls />

      {/* <color args={["#000000"]} attach="background" /> */}

      <Suspense fallback={null}>
        <AlienFlower />
      </Suspense>
    </>
  );
}
