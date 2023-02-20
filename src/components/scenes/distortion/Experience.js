import { Suspense, useEffect, useRef, useState } from "react";
import React from "react";

import { shaderMaterial, OrbitControls, Stage } from "@react-three/drei";

import paintingVertexShader from "./shaders/vertex.js";
import paintingFragmentShader from "./shaders/fragment.js";

import * as THREE from "three";
import { useFrame, extend } from "@react-three/fiber";

import {
  DepthOfField,
  Bloom,
  EffectComposer,
} from "@react-three/postprocessing";

const SphereMaterial = shaderMaterial(
  {
    uTime: 0,
  },
  paintingVertexShader,
  paintingFragmentShader
);
extend({ SphereMaterial });

function Object() {
  const shaderRef = useRef();
  const geomertyRef = useRef();
  const ref = useRef();

  useFrame((state, delta) => {
    if (shaderRef.current) shaderRef.current.uTime += delta * 0.3;
    ref.current.rotation.y += delta;
  });

  return (
    <mesh ref={ref}>
      {/* <extrudeGeometry ref={geomertyRef} args={[shape, extrudeSettings]} /> */}
      <icosahedronGeometry ref={geomertyRef} args={[2, 16, 8]} />
      <sphereMaterial ref={shaderRef} />
    </mesh>
  );
}

export default function Experience() {
  return (
    <>
      <OrbitControls />
      <EffectComposer>
        <DepthOfField focusDistance={0.25} focalLength={0.45} bokehScale={0} />
        {/* <Bloom mipmapBlur intensity={0.1} luminanceThreshold={0} /> */}
      </EffectComposer>

      {/* <color args={["#0D1117"]} attach="background" /> */}

      <Suspense fallback={null}>
        <Object />
      </Suspense>
    </>
  );
}
