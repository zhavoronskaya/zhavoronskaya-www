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
import { DepthOfField, EffectComposer } from "@react-three/postprocessing";

const count = 3000;
const size = 200;

const ParticlesMaterial = new shaderMaterial(
  { uSize: 100, uTime: 0 },
  pointsVertexShader,
  pointsFragmentShader
);

extend({ ParticlesMaterial });

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
      <particlesMaterial
        ref={shaderRef}
        transparent={true}
        uSize={size}
        depthWrite={false}
        // blending={THREE.AdditiveBlending}
        vertexColors
      />
      {Array.from({ length: count }).map((_, i) => {
        const position = [
          (Math.random() - 0.5) * 5.0,
          0,
          (Math.random() - 0.5) * 5.0,
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
      <OrbitControls
      // makeDefault
      // autoRotate
      // autoRotateSpeed={1.5}
      // zoomSpeed={0.5}
      />

      {/* <color args={["#0D1117"]} attach="background" /> */}
      <Suspense fallback={null}>
        <Particles />
      </Suspense>
    </>
  );
}
