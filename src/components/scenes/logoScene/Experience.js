import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Environment } from "@react-three/drei";
import React from "react";

import {
  shaderMaterial,
  OrbitControls,
  useTexture,
  Cloud,
  meshBounds,
} from "@react-three/drei";

import paintingVertexShader from "./shaders/vertex.js";
import paintingFragmentShader from "./shaders/fragment.js";

import * as THREE from "three";
import { useThree, useFrame, extend } from "@react-three/fiber";

import {
  DepthOfField,
  Bloom,
  EffectComposer,
} from "@react-three/postprocessing";
import { DoubleSide } from "three";

// Texture loader
// const textureLoader = new THREE.TextureLoader();
// const textWater = textureLoader.load("/public/image/cover.png");
// textWater.encoding = THREE.sRGBEncoding;

const LogoMaterial = shaderMaterial(
  {
    uTime: 0,
    uTex: new THREE.Texture(),
  },
  paintingVertexShader,
  paintingFragmentShader
);
extend({ LogoMaterial });

function Painting() {
  const textLogo = useTexture("./image/logo.png");
  // textLogo.encoding = THREE.sRGBEncoding;
  const shaderRef = useRef();
  const geomertyRef = useRef();
  const { width, height } = useThree((state) => state.size);

  useEffect(() => {
    shaderRef.current.uTex = textLogo;
  }, []);

  useFrame((state, delta) => {
    if (shaderRef.current)
      shaderRef.current.uniforms.uTime.value += delta * 0.5;
  });

  const logo = useRef();

  const eventHandler = (event) => {
    //console.log(event);
    // logo.current.material.uniforms.uTime.value *= 2.0;
  };

  return (
    <mesh
      ref={logo}
      onClick={eventHandler}
      onPointerEnter={eventHandler}
      raycast={meshBounds}
    >
      <planeGeometry
        ref={geomertyRef}
        args={[(width * 1024) / 60000, (height * 512) / 60000, 128, 128]}
      />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={paintingVertexShader}
        fragmentShader={paintingFragmentShader}
        transparent={false}
        uniforms={{
          uTime: { value: 0 },
          uTex: { value: textLogo },
          // uDataTexture: { value: texture },
        }}
      />
      {/* <logoMaterial ref={shaderRef} /> */}
      {/* <meshBasicMaterial map={textWater} /> */}
    </mesh>
  );
}

export default function Experience() {
  return (
    <>
      <OrbitControls />
      <color args={["#F3CBFE"]} attach="background" />
      {/* <EffectComposer multisampling={4}>
        <DepthOfField focusDistance={0.025} focalLength={0.15} bokehScale={6} />
        <Bloom mipmapBlur intensity={0.2} luminanceThreshold={0} />
      </EffectComposer> */}
      <Suspense fallback={null}>
        {/* <Cloud position={[-4, -2, 9]} speed={0.2} opacity={0.2} /> */}
        {/* <Cloud position={[4, 2, -15]} speed={0.2} opacity={1} />
        <Cloud position={[-4, 2, -10]} speed={0.2} opacity={1} />
        <Cloud position={[4, -2, -5]} speed={0.2} opacity={1} /> */}
        <Painting />
      </Suspense>
      {/* <Environment preset="night" /> */}
    </>
  );
}
