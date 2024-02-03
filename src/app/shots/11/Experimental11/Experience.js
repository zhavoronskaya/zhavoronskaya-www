import { Suspense, useRef } from "react";
import { Environment } from "@react-three/drei";
import React from "react";

import { shaderMaterial, OrbitControls, Sparkles } from "@react-three/drei";

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

const ExperimentalShapeMaterialEleven = shaderMaterial(
  {
    uTime: 0,
    uIterration: 4,
    uResolution: new THREE.Vector2(0, 0),
  },
  paintingVertexShader,
  paintingFragmentShader
);
extend({ ExperimentalShapeMaterialEleven });

function Painting() {
  const shaderRef = useRef();

  const geomertyRef = useRef();
  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (shaderRef.current) {
      shaderRef.current.uTime += delta * 0.5;
      shaderRef.current.uResolution = new THREE.Vector2(
        1,
        viewport.height / viewport.width
      );
    }

    // state.camera.fov = Math.sin(state.clock.getElapsedTime()) * 10 + 45;
    // state.camera.updateProjectionMatrix();
    // geomertyRef.current.rotation.z += delta * 0.5;
  });
  return (
    <group>
      <mesh ref={geomertyRef}>
        {/* <planeGeometry
        ref={geomertyRef}
        args={[viewport.width, viewport.height, 64, 64]}
      /> */}
        {/* <torusGeometry args={[4, 0.8, 128, 256]} /> */}
        {/* <sphereGeometry args={[2, 512, 512]} /> */}
        {/* <torusKnotGeometry args={[4, 0.8, 512, 256]} /> */}
        {/* <circleGeometry args={[2, 512]} /> */}
        <planeGeometry
          ref={geomertyRef}
          args={[viewport.width, viewport.height, 16, 16]}
        />
        <experimentalShapeMaterialEleven ref={shaderRef} wireframe={false} />
      </mesh>
    </group>
  );
}

export default function Experience() {
  return (
    <>
      {/* <EffectComposer multisampling={4}>
    
      </EffectComposer> */}
      <color args={["#240b15"]} attach="background" />
      {/* <OrbitControls /> */}

      <Suspense fallback={null}>
        <Painting />
      </Suspense>
    </>
  );
}
