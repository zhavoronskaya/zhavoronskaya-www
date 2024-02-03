import {
  shaderMaterial,
  OrbitControls,
  Point,
  Points,
} from "@react-three/drei";

import { extend, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef, useEffect } from "react";
import * as THREE from "three";

import pointsVertexShader from "./shaders/vertex.js";
import pointsFragmentShader from "./shaders/fragment.js";
import {
  DepthOfField,
  EffectComposer,
  Vignette,
  Bloom,
} from "@react-three/postprocessing";

const count = 10000;
const size = 800;

const ParticlesMaterialFourteen = new shaderMaterial(
  { uSize: 800, uTime: 0 },
  pointsVertexShader,
  pointsFragmentShader
);

extend({ ParticlesMaterialFourteen });

function Particles() {
  const shaderRef = useRef();
  const pointsRef = useRef();

  useFrame((state, delta) => {
    // if (shaderRef.current)
    //   shaderRef.current.uTime += state.clock.getElapsedTime() * 0.0051;

    if (shaderRef.current) shaderRef.current.uTime += delta * 0.5;
  });

  return (
    <Points limit={10000}>
      <particlesMaterialFourteen
        ref={shaderRef}
        transparent={true}
        uSize={size}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
      />
      {Array.from({ length: count }).map((_, i) => {
        const tetha = Math.random();
        const phi = Math.random();
        const position = [
          Math.sin(tetha * Math.PI) * Math.cos(phi * Math.PI * 2) * 5.69,
          Math.cos(tetha * Math.PI) * 5.69,
          Math.sin(tetha * Math.PI) * Math.sin(phi * Math.PI * 2) * 5.69,
        ];
        const scale = Math.random() * size;

        return <Point key={i} position={position} size={scale} />;
      })}
    </Points>
  );
}

export default function Experience() {
  return (
    <>
      <OrbitControls />
      {/* <EffectComposer multisampling={2}>
        <DepthOfField
          focusDistance={0}
          focalLength={0.02}
          bokehScale={2}
          height={480}
        />

        <Vignette eskil={false} offset={0.1} darkness={1.0} />
      </EffectComposer> */}

      {/* <color args={["#02241a"]} attach="background" /> */}
      <color args={["#07061c"]} attach="background" />
      <Suspense fallback={null}>
        <Particles />
      </Suspense>
    </>
  );
}
