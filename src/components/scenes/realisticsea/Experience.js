import { Suspense, useRef } from "react";
import React from "react";

import { shaderMaterial, OrbitControls } from "@react-three/drei";

import sandVertexShader from "./shaders/vertex.js";
import sandFragmentShader from "./shaders/fragment.js";

import * as THREE from "three";
import { useFrame, extend, useThree } from "@react-three/fiber";

import {
  DepthOfField,
  Bloom,
  EffectComposer,
} from "@react-three/postprocessing";

const SandMaterial = shaderMaterial(
  {
    uTime: 0,
    uResolution: new THREE.Vector2(0, 0),
  },

  sandVertexShader,
  sandFragmentShader
);
extend({ SandMaterial });

function Sea() {
  const { viewport } = useThree();
  const shaderRef = useRef();
  const geomertyRef = useRef();
  const ref = useRef();
  const shaderWaveRef = useRef();

  useFrame((state, delta) => {
    if (shaderRef.current) {
      shaderRef.current.uTime += delta * 0.5;
      shaderRef.current.uResolution = new THREE.Vector2(
        viewport.width,
        viewport.height
      );
      console.log(viewport.width, viewport.height);
    }

    if (shaderWaveRef.current) {
      shaderWaveRef.current.uTime += delta * 0.5;
      shaderWaveRef.current.uResolution = new THREE.Vector2(
        viewport.width,
        viewport.height
      );
    }
    // if (shaderRef.current) shaderRef.current.uTime += delta * 0.07;
    // ref.current.rotation.y += delta;
    // state.camera.fov = Math.sin(state.clock.getElapsedTime()) * 20 + 45;
    // state.camera.updateProjectionMatrix();
  });

  return (
    <group>
      <mesh rotation={[0, 0, 0]} ref={ref}>
        <planeGeometry
          ref={geomertyRef}
          args={[viewport.width, viewport.height, 128, 64]}
        />
        <sandMaterial ref={shaderRef} />
      </mesh>
    </group>
  );
}

export default function Experience() {
  return (
    <>
      <OrbitControls
        onEnd={(e) => console.log(e.target.object.position.toArray())}
      />
      {/* <EffectComposer>
        <DepthOfField
          focusDistance={0.025}
          focalLength={0.15}
          bokehScale={0.5}
        />
        <Bloom mipmapBlur intensity={0.1} luminanceThreshold={0} />
      </EffectComposer> */}

      <color args={["#a7b6db"]} attach="background" />

      <Suspense fallback={null}>
        <Sea />
      </Suspense>
    </>
  );
}
