import { Suspense, useRef } from "react";
import React from "react";

import { shaderMaterial, OrbitControls, Sparkles } from "@react-three/drei";

import paintingVertexShader from "./shaders/vertex.js";
import paintingFragmentShader from "./shaders/fragment.js";
import baseVertexShader from "./shaders/baseVertex.js";
import baseFragmentShader from "./shaders/baseFragment.js";

import * as THREE from "three";
import { useFrame, extend } from "@react-three/fiber";

import {
  DepthOfField,
  Bloom,
  EffectComposer,
} from "@react-three/postprocessing";

const MushroomHeadMaterial = shaderMaterial(
  {
    uTime: 0,
  },
  paintingVertexShader,
  paintingFragmentShader
);
extend({ MushroomHeadMaterial });

const MushroomBaseMaterial = shaderMaterial(
  {
    uTime: 0,
  },
  baseVertexShader,
  baseFragmentShader
);
extend({ MushroomBaseMaterial });

function Mushroom() {
  const shaderHeadRef = useRef();
  const shaderBaseRef = useRef();
  const geomertyRef = useRef();
  const ref = useRef();

  useFrame((state, delta) => {
    if (shaderHeadRef.current) shaderHeadRef.current.uTime += delta * 0.1;
    if (shaderBaseRef.current) shaderBaseRef.current.uTime += delta * 0.1;
    ref.current.rotation.y += delta;
    state.camera.fov = Math.sin(state.clock.getElapsedTime()) * 2 + 45;
    state.camera.updateProjectionMatrix();
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry
          ref={geomertyRef}
          args={[5, 256, 128, 0, Math.PI * 2, 0, Math.PI * 0.5]}
        />
        <mushroomHeadMaterial ref={shaderHeadRef} />
      </mesh>
      <mesh position={[0, -3, 0]}>
        <cylinderGeometry args={[1, 3, 8, 256, 128, true]} />
        <mushroomBaseMaterial ref={shaderBaseRef} />
      </mesh>
    </group>
  );
}

export default function Experience() {
  return (
    <>
      <OrbitControls />
      {/* <EffectComposer>
        <DepthOfField focusDistance={0.025} focalLength={0.15} bokehScale={2} />
        <Bloom mipmapBlur intensity={0.1} luminanceThreshold={0} />
      </EffectComposer> */}
      <Sparkles size={4} scale={[15, 12, 15]} speed={1} count={1000} />
      <color args={["#0D1117"]} attach="background" />
      <Suspense fallback={null}>
        <Mushroom />
      </Suspense>
    </>
  );
}
