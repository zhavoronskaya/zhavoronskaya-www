import { Suspense, useEffect, useRef, useState } from "react";
import React from "react";

import {
  shaderMaterial,
  OrbitControls,
  Sparkles,
  Stars,
  Point,
  Points,
} from "@react-three/drei";

import paintingVertexShader from "./shaders/vertex.js";
import paintingFragmentShader from "./shaders/fragment.js";
import baseVertexShader from "./shaders/baseVertex.js";
import baseFragmentShader from "./shaders/baseFragment.js";
import pointsVertexShader from "./shaders/pointsVertex.js";
import pointsFragmentShader from "./shaders/pointsFragment.js";
import basePointsVertexShader from "./shaders/basePointsVertex.js";
import basePointsFragmentShader from "./shaders/basePointsFragment.js";
import groundVertexShader from "./shaders/groundVertex.js";
import groundFragmentShader from "./shaders/groundFragment.js";

import * as THREE from "three";
import { useFrame, extend, useThree } from "@react-three/fiber";

import {
  DepthOfField,
  Bloom,
  EffectComposer,
} from "@react-three/postprocessing";
import { MeshBasicMaterial } from "three";

const MushroomHeadMaterial = shaderMaterial(
  {
    uTime: 0,
  },
  paintingVertexShader,
  paintingFragmentShader
);
extend({ MushroomHeadMaterial });

const MushroomBaseMaterial = shaderMaterial(
  {
    uTime: 0,
  },
  baseVertexShader,
  baseFragmentShader
);
extend({ MushroomBaseMaterial });

const GroundBaseMaterial = shaderMaterial(
  { uResolution: new THREE.Vector2(0, 0) },
  groundVertexShader,
  groundFragmentShader
);
extend({ GroundBaseMaterial });

const StarsMaterial = shaderMaterial(
  { uSize: 100, uTime: 0 },
  pointsVertexShader,
  pointsFragmentShader
);
extend({ StarsMaterial });

const StarsBaseMaterial = shaderMaterial(
  { uSize: 100, uTime: 0 },
  basePointsVertexShader,
  basePointsFragmentShader
);
extend({ StarsBaseMaterial });

function Mushroom() {
  const shaderHeadRef = useRef();
  const shaderBaseRef = useRef();
  const shaderGroundRef = useRef();

  const head = useRef();
  const base = useRef();

  const ref = useRef();

  useFrame((state, delta) => {
    if (shaderHeadRef.current) shaderHeadRef.current.uTime += delta * 0.1;
    if (shaderBaseRef.current) shaderBaseRef.current.uTime += delta * 0.1;
    if (shaderGroundRef.current) {
      shaderGroundRef.current.uResolution = new THREE.Vector2(
        1,
        viewport.height / viewport.width
      );
    }

    ref.current.rotation.y += delta;
    state.camera.fov = Math.sin(state.clock.getElapsedTime()) * 2 + 45;
    state.camera.updateProjectionMatrix();
  });
  const { viewport } = useThree();
  return (
    <group ref={ref}>
      {/* <mesh position={[0, -7.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry
          args={[viewport.width * 100, viewport.height * 100, 64, 32]}
        />
        <groundBaseMaterial ref={shaderGroundRef} />
      </mesh> */}
      <mesh ref={head}>
        <sphereGeometry
          args={[5, 256, 128, 0, Math.PI * 2, 0, Math.PI * 0.5]}
        />
        <mushroomHeadMaterial ref={shaderHeadRef} />
      </mesh>
      <mesh ref={base} position={[0, -3, 0]}>
        <cylinderGeometry args={[1, 3, 8, 256, 128, true]} />
        <mushroomBaseMaterial ref={shaderBaseRef} />
      </mesh>
    </group>
  );
}

function Particles() {
  const starsShaderRef = useRef();
  const starsBaseShaderRef = useRef();
  const size = 500;

  const pos = [];

  // useEffect(()=>{
  //   for (let i =0; i <1500; i++ ) {
  //     let i3 = i*3 ;
  //     let delta = 0;
  //   pos[i3]=      Math.cos(angle * Math.PI * 2) * 1.41 +delta;
  //   pos[i3+1]=   (Math.random() - 0.5) * 8.41 - 3;
  //   pos[i3+2] =     Math.sin(angle * Math.PI * 2) * 1.41 +delta;
  //   delta +=0.1
  //   }

  // }, [])

  useFrame((state, delta) => {
    if (starsShaderRef.current) starsShaderRef.current.uTime += delta * 0.1;
    if (starsBaseShaderRef.current)
      starsBaseShaderRef.current.uTime += delta * 0.1;
  });

  return (
    <group>
      <Points limit={10000}>
        <starsBaseMaterial
          ref={starsBaseShaderRef}
          transparent={true}
          uSize={size}
          depthWrite={false}
          // blending={THREE.AdditiveBlending}
          vertexColors
        />
        {Array.from({ length: 1500 }).map((_, i) => {
          const angle = Math.random();
          const position = [
            Math.cos(angle * Math.PI * 2) * 3.41,
            (Math.random() - 0.5) * 8.41 - 3,
            Math.sin(angle * Math.PI * 2) * 3.41,
          ];
          const scale = Math.random() * size;

          return <Point key={i} position={position} size={scale} />;
        })}
      </Points>
      <Points limit={10000}>
        <starsMaterial
          ref={starsShaderRef}
          transparent={true}
          uSize={size}
          depthWrite={false}
          // blending={THREE.AdditiveBlending}
          vertexColors
        />
        {Array.from({ length: 1500 }).map((_, i) => {
          const tetha = Math.random();
          const phi = Math.random();
          const position = [
            Math.sin(tetha * Math.PI * 0.5) *
              Math.cos(phi * Math.PI * 2) *
              5.69,
            Math.cos(tetha * Math.PI * 0.5) * 5.69,
            Math.sin(tetha * Math.PI * 0.5) *
              Math.sin(phi * Math.PI * 2) *
              5.69,
          ];
          const scale = Math.random() * size;

          return <Point key={i} position={position} size={scale} />;
        })}
      </Points>
    </group>
  );
}

export default function Experience() {
  return (
    <>
      {/* <OrbitControls /> */}
      {/* <EffectComposer>
        <DepthOfField focusDistance={0.5} focalLength={0.15} bokehScale={1} />
        <Bloom mipmapBlur intensity={0.05} luminanceThreshold={0} />
      </EffectComposer> */}
      {/* <Stars
        radius={10}
        depth={50}
        count={5000}
        factor={1}
        saturation={0}
        fade
        speed={1}
      /> */}
      <Sparkles size={4} scale={[15, 12, 15]} speed={1} count={1000} />
      <color args={["#0D1117"]} attach="background" />
      <Suspense fallback={null}>
        <Particles />
        <Mushroom />
      </Suspense>
    </>
  );
}
