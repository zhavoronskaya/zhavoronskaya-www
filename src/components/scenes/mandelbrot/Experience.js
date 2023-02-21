import { Suspense, useEffect, useRef } from "react";
import React from "react";

import { shaderMaterial, OrbitControls, useTexture } from "@react-three/drei";

import paintingVertexShader from "./shaders/vertex.js";
import paintingFragmentShader from "./shaders/fragment.js";

import * as THREE from "three";
import { useThree, useFrame, extend } from "@react-three/fiber";

import {
  DepthOfField,
  Bloom,
  EffectComposer,
} from "@react-three/postprocessing";

const MandelbrotMaterial = shaderMaterial(
  {
    uTime: 0,
  },
  paintingVertexShader,
  paintingFragmentShader
);
extend({ MandelbrotMaterial });

function Painting() {
  const shaderRef = useRef();
  const geomertyRef = useRef();
  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (shaderRef.current) shaderRef.current.uTime += delta * 0.8;
  });

  return (
    <mesh>
      <planeGeometry
        ref={geomertyRef}
        args={[viewport.width, viewport.height, 128, 64]}
      />
      <mandelbrotMaterial ref={shaderRef} />
      {/* <meshBasicMaterial map={textWater} /> */}
    </mesh>
  );
}

export default function Experience() {
  return (
    <>
      {/* <OrbitControls /> */}
      <color args={["#F3CBFE"]} attach="background" />
      {/* <EffectComposer multisampling={4}>
        <DepthOfField focusDistance={0.025} focalLength={0.15} bokehScale={6} />
        <Bloom mipmapBlur intensity={0.2} luminanceThreshold={0} />
      </EffectComposer> */}
      <Suspense fallback={null}>
        <Painting />
      </Suspense>
      {/* <Environment preset="night" /> */}
    </>
  );
}
