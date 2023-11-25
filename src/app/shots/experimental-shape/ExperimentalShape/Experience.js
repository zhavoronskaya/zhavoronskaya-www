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
  Noise,
  Vignette,
} from "@react-three/postprocessing";

const ExperimentalShapeMaterial = shaderMaterial(
  {
    uTime: 0,
    uIterration: 4,
    uResolution: new THREE.Vector2(0, 0),
  },
  paintingVertexShader,
  paintingFragmentShader
);
extend({ ExperimentalShapeMaterial });

function Painting() {
  const shaderRef = useRef();
  const geomertyRef = useRef();
  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (shaderRef.current) {
      shaderRef.current.uTime += delta * 0.1;
      shaderRef.current.uResolution = new THREE.Vector2(
        1,
        viewport.height / viewport.width
      );
    }
  });
  return (
    <mesh>
      {/* <planeGeometry
        ref={geomertyRef}
        args={[viewport.width, viewport.height, 64, 64]}
      /> */}
      <sphereGeometry args={[2, 1024, 1024]} />
      <experimentalShapeMaterial ref={shaderRef} wireframe={false} />
    </mesh>
  );
}

export default function Experience() {
  return (
    <>
      <EffectComposer multisampling={4}>
        {/* <DepthOfField
          focusDistance={0}
          focalLength={0.02}
          bokehScale={2}
          height={480}
        /> */}
        {/* <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} /> */}
        <Noise opacity={0.1} />
      </EffectComposer>
      {/* <color args={["#aa94b5"]} attach="background" /> */}
      {/* <OrbitControls /> */}

      <Suspense fallback={null}>
        <Painting />
      </Suspense>
    </>
  );
}
