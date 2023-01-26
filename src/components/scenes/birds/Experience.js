import { Suspense, useEffect, useRef, useState } from "react";
// import { Environment, CameraShake } from "@react-three/drei";
import React from "react";

import { shaderMaterial, OrbitControls, Stage } from "@react-three/drei";

import paintingVertexShader from "./shaders/vertex.js";
import paintingFragmentShader from "./shaders/fragment.js";

// import * as THREE from "three";
import { useThree, useFrame, extend } from "@react-three/fiber";

import { EffectComposer, SSR } from "@react-three/postprocessing";
import { Cloud, Sparkles } from "@react-three/drei";

const FigureMaterial = shaderMaterial(
  {
    uTime: 0,
  },
  paintingVertexShader,
  paintingFragmentShader
);
extend({ FigureMaterial });

function Object() {
  const shaderRef = useRef();
  const geomertyRef = useRef();
  const ref = useRef();
  const { width, height } = useThree((state) => state.size);

  // useEffect(() => {
  //   shaderRef.current.uTex = textWater;
  // }, []);

  useFrame((state, delta) => {
    if (shaderRef.current) shaderRef.current.uTime += delta * 0.1;
    // ref.current.rotation.y += delta * 0.08;
  });

  return (
    <mesh ref={ref}>
      <torusKnotGeometry ref={geomertyRef} args={[1.5, 0.3, 512, 512]} />
      <figureMaterial ref={shaderRef} />
      {/* <meshBasicMaterial map={textWater} /> */}
    </mesh>
  );
}

export default function Experience() {
  return (
    <>
      <OrbitControls />
      <EffectComposer></EffectComposer>

      <color args={["#F3CBFE"]} attach="background" />

      <Suspense fallback={null}>
        <Sparkles size={1} scale={[10, 10, 10]} speed={0.2} count={400} />
        <Cloud position={[-4, -2, 9]} speed={0.2} opacity={0.2} />
        <Cloud position={[4, 2, -15]} speed={0.2} opacity={1} />
        <Cloud position={[-4, 2, -10]} speed={0.2} opacity={1} />
        <Cloud position={[4, -2, -5]} speed={0.2} opacity={1} />
      </Suspense>
    </>
  );
}
