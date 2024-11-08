import { Suspense, useRef } from "react";
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

const EllipsesMaterial = shaderMaterial(
  {
    uTime: 0,
    uResolution: new THREE.Vector2(0, 0),
  },
  paintingVertexShader,
  paintingFragmentShader
);
extend({ EllipsesMaterial });

function Painting() {
  const shaderRef = useRef();
  const geomertyRef = useRef();
  const { viewport } = useThree();
  useFrame((state, delta) => {
    {
      shaderRef.current.uTime += delta * 0.1;
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
        args={[viewport.width, viewport.height, 128, 64]}
      />
      <ellipsesMaterial ref={shaderRef} />
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
      <Suspense fallback={null}>
        <Painting />
      </Suspense>
    </>
  );
}
