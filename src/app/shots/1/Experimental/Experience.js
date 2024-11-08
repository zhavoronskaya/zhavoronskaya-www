import { Suspense, useRef } from "react";
import { Environment } from "@react-three/drei";
import React from "react";

import { shaderMaterial, OrbitControls } from "@react-three/drei";

import paintingVertexShader from "./shaders/vertex.js";
import paintingFragmentShader from "./shaders/fragment.js";

import { useThree, useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
import {
  DepthOfField,
  Bloom,
  EffectComposer,
} from "@react-three/postprocessing";

const ExperimentalMaterial = shaderMaterial(
  {
    uTime: 0,
    uIterration: 4,
    uResolution: new THREE.Vector2(0, 0),
  },
  paintingVertexShader,
  paintingFragmentShader
);
extend({ ExperimentalMaterial });

function Painting() {
  const shaderRef = useRef();
  const geomertyRef = useRef();
  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (shaderRef.current) {
      shaderRef.current.uTime += delta * 0.05;
      shaderRef.current.uResolution = new THREE.Vector2(
        1,
        viewport.height / viewport.width
      );
    }
  });

  return (
    <mesh>
      <planeGeometry
        ref={geomertyRef}
        args={[viewport.width, viewport.height, 64, 32]}
      />
      <experimentalMaterial ref={shaderRef} wireframe={false} />
    </mesh>
  );
}

export default function Experience() {
  return (
    <>
      <OrbitControls />

      <Suspense fallback={null}>
        <Painting />
      </Suspense>
    </>
  );
}
