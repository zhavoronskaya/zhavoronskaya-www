import { Suspense, useRef } from "react";
import { Environment } from "@react-three/drei";
import React from "react";

import { shaderMaterial, OrbitControls } from "@react-three/drei";

import paintingVertexShader from "./shaders/vertex.js";
import paintingFragmentShader from "./shaders/fragment";

import * as THREE from "three";
import { useThree, useFrame, extend } from "@react-three/fiber";

import {
  DepthOfField,
  Bloom,
  EffectComposer,
} from "@react-three/postprocessing";

const PaintMaterial = shaderMaterial(
  {
    uTime: 0,
  },
  paintingVertexShader,
  paintingFragmentShader
);
extend({ PaintMaterial });

function Painting() {
  const shaderRef = useRef();
  const geomertyRef = useRef();
  const { width, height } = useThree((state) => state.size);
  //   console.log(width);
  useFrame((state, delta) => {
    if (shaderRef.current) shaderRef.current.uTime += delta * 0.1;
  });
  return (
    <mesh>
      <planeGeometry
        ref={geomertyRef}
        args={[width / 50, height / 50, 32, 32]}
      />
      <paintMaterial ref={shaderRef} />
    </mesh>
  );
}

export default function Experience() {
  return (
    <>
      {/* <OrbitControls /> */}
      <EffectComposer>
        <DepthOfField focusDistance={0.025} focalLength={0.15} bokehScale={6} />
        <Bloom mipmapBlur intensity={0.5} luminanceThreshold={0} />
      </EffectComposer>
      <color args={["#000000"]} attach="background" />
      <Suspense fallback={null}>
        <Painting />
      </Suspense>
      <Environment preset="night" />
    </>
  );
}
