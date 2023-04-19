import { Suspense, useRef } from "react";
import React from "react";

import { shaderMaterial, OrbitControls, Environment } from "@react-three/drei";

import cameoVertexShader from "./shaders/vertex.js";
import cameoFragmentShader from "./shaders/fragment.js";

import * as THREE from "three";
import { useFrame, extend } from "@react-three/fiber";

import {
  DepthOfField,
  Bloom,
  EffectComposer,
} from "@react-three/postprocessing";

const CameoMaterial = shaderMaterial(
  {
    uTime: 0,
  },

  cameoVertexShader,
  cameoFragmentShader
);
extend({ CameoMaterial });

function Cameo() {
  const shaderRef = useRef();
  const geomertyRef = useRef();
  const ref = useRef();

  useFrame((state, delta) => {
    if (shaderRef.current) shaderRef.current.uTime += delta * 0.3;
    // ref.current.rotation.y += Math.sin(delta * Math.PI * 0.5);
  });

  return (
    <mesh rotation={[0, 0, 0]} ref={ref}>
      <coneGeometry ref={geomertyRef} args={[1.0, 1.0, 512, 512, true]} />
      {/* <planeGeometry ref={geomertyRef} args={[1, 1, 2.0, 512, 512]} /> */}
      <cameoMaterial side={THREE.DoubleSide} ref={shaderRef} />
    </mesh>
  );
}

export default function Experience() {
  return (
    <>
      <OrbitControls />
      {/* <EffectComposer>
        <DepthOfField
          focusDistance={0.025}
          focalLength={0.15}
          bokehScale={0.5}
        />
        <Bloom mipmapBlur intensity={0.2} luminanceThreshold={0} />
      </EffectComposer> */}

      {/* <color args={["#000000"]} attach="background" /> */}
      <Environment preset="night" />
      <Suspense fallback={null}>
        <Cameo />
      </Suspense>
    </>
  );
}
