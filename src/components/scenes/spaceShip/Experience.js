import { Suspense, useEffect, useRef } from "react";
import React from "react";

import { shaderMaterial, OrbitControls, Environment } from "@react-three/drei";

import raptureVertexShader from "./shaders/vertex.js";
import raptureFragmentShader from "./shaders/fragment.js";

import * as THREE from "three";
import { useFrame, extend } from "@react-three/fiber";

import {
  DepthOfField,
  Bloom,
  EffectComposer,
} from "@react-three/postprocessing";
import { CubeTextureLoader } from "three";

function createSkyBox() {
  const loader = new CubeTextureLoader();
  const texture = loader.load([
    "/texture/alonetogether/px.png",
    "/texture/alonetogether/nx.png",
    "/texture/alonetogether/py.png",
    "/texture/alonetogether/ny.png",
    "/texture/alonetogether/pz.png",
    "/texture/alonetogether/nz.png",
  ]);
  console.log(texture);
  return texture;
}

const AloneTogetherMaterial = shaderMaterial(
  {
    uTime: 0,
    specMap: null,
  },

  raptureVertexShader,
  raptureFragmentShader
);
extend({ AloneTogetherMaterial });

function Object() {
  const shaderRef = useRef();
  const geomertyRef = useRef();
  const ref = useRef();
  useEffect(() => {
    shaderRef.current.specMap = createSkyBox();
  }, []);
  useFrame((state, delta) => {
    if (shaderRef.current) shaderRef.current.uTime += delta * 0.3;
    // ref.current.rotation.y += delta;
    state.camera.fov = Math.sin(state.clock.getElapsedTime()) * 10 + 45;
    state.camera.updateProjectionMatrix();
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry ref={geomertyRef} args={[2, 128]} />
      <aloneTogetherMaterial ref={shaderRef} />
      {/* <shaderMaterial
        ref={shaderRef}
        key="stable"
        vertexShader={raptureVertexShader}
        fragmentShader={raptureFragmentShader}
        wireframe={true}
        uniforms={{
          uTime: { value: 0 },
        }}
      /> */}
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
      {/* <Environment preset="night" /> */}
      <Suspense fallback={null}>
        <Object />
      </Suspense>
    </>
  );
}
