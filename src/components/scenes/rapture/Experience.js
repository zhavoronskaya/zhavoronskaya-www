import { Suspense, useRef } from "react";
import React from "react";

import { shaderMaterial, OrbitControls } from "@react-three/drei";

import raptureVertexShader from "./shaders/vertex.js";
import raptureFragmentShader from "./shaders/fragment.js";

import * as THREE from "three";
import { useFrame, extend } from "@react-three/fiber";

import {
  DepthOfField,
  Bloom,
  EffectComposer,
} from "@react-three/postprocessing";

const RaptureMaterial = shaderMaterial(
  {
    uTime: 0,
  },

  raptureVertexShader,
  raptureFragmentShader
);
extend({ RaptureMaterial });

function Object() {
  const shaderRef = useRef();
  const geomertyRef = useRef();
  const ref = useRef();

  useFrame((state, delta) => {
    if (shaderRef.current) shaderRef.current.uTime += delta * 0.07;
    // ref.current.rotation.y += delta;
    // state.camera.fov = Math.sin(state.clock.getElapsedTime()) * 20 + 45;
    // state.camera.updateProjectionMatrix();
  });

  return (
    <mesh rotation={[-Math.sin(Math.PI / 4), 0, 0]} ref={ref}>
      <planeGeometry ref={geomertyRef} args={[2, 2, 128, 64]} />
      <raptureMaterial wireframe={true} ref={shaderRef} />
      {/* <shaderMaterial
        ref={shaderRef}
        key="stable"
        vertexShader={raptureVertexShader}
        fragmentShader={raptureFragmentShader}
        wireframe={true}
        uniforms={{
          uTime: { value: 0 },
        }}
      /> */}
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
        <Bloom mipmapBlur intensity={0.01} luminanceThreshold={0} />
      </EffectComposer> */}
      {/* 
      <color args={["#62266C"]} attach="background" /> */}

      <Suspense fallback={null}>
        <Object />
      </Suspense>
    </>
  );
}
