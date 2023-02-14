import { Suspense, useEffect, useRef } from "react";
import { Environment } from "@react-three/drei";
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

// Texture loader
// const textureLoader = new THREE.TextureLoader();
// const textWater = textureLoader.load("/public/image/cover.png");
// textWater.encoding = THREE.sRGBEncoding;

const LiquidMaterial = shaderMaterial(
  {
    uTime: 0,
    uTex: new THREE.Texture(),
  },
  paintingVertexShader,
  paintingFragmentShader
);
extend({ LiquidMaterial });

function Painting() {
  const textWater = useTexture("/image/cover.png");
  textWater.encoding = THREE.sRGBEncoding;
  const shaderRef = useRef();
  const geomertyRef = useRef();
  const { viewport } = useThree();

  useEffect(() => {
    shaderRef.current.uTex = textWater;
  }, []);

  useFrame((state, delta) => {
    if (shaderRef.current) shaderRef.current.uTime += delta * 0.1;
  });

  return (
    <mesh>
      <planeGeometry
        ref={geomertyRef}
        args={[viewport.width, viewport.height, 128, 64]}
      />
      <liquidMaterial ref={shaderRef} />
      {/* <meshBasicMaterial map={textWater} /> */}
    </mesh>
  );
}

export default function Experience() {
  return (
    <>
      {/* <OrbitControls /> */}
      <color args={["#F3CBFE"]} attach="background" />
      <EffectComposer multisampling={4}>
        <DepthOfField focusDistance={0.025} focalLength={0.15} bokehScale={6} />
        <Bloom mipmapBlur intensity={0.2} luminanceThreshold={0} />
      </EffectComposer>
      <Suspense fallback={null}>
        <Painting />
      </Suspense>
      {/* <Environment preset="night" /> */}
    </>
  );
}
