import { Suspense, useRef } from "react";
import React from "react";
import { useFrame, extend } from "@react-three/fiber";
import { shaderMaterial, OrbitControls } from "@react-three/drei";

import paintingVertexShader from "./shaders/vertex.js";
import paintingFragmentShader from "./shaders/fragment.js";

import {
  DepthOfField,
  Bloom,
  EffectComposer,
} from "@react-three/postprocessing";

const DistortionMaterial = shaderMaterial(
  { uTime: 0 },
  paintingVertexShader,
  paintingFragmentShader
);
extend({ DistortionMaterial });

function Object() {
  const shaderRef = useRef();
  const geomertyRef = useRef();
  const ref = useRef();

  useFrame((state, delta) => {
    if (shaderRef.current) shaderRef.current.uTime += delta * 0.3;
    ref.current.rotation.y += delta;
    state.camera.fov = Math.sin(state.clock.getElapsedTime()) * 20 + 45;
    state.camera.updateProjectionMatrix();
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry ref={geomertyRef} args={[2, 512, 256]} />
      <distortionMaterial ref={shaderRef} />
    </mesh>
  );
}

export default function Experience() {
  return (
    <>
      {/* <OrbitControls /> */}
      <EffectComposer>
        <DepthOfField
          focusDistance={0.025}
          focalLength={0.15}
          bokehScale={0.5}
        />
        <Bloom mipmapBlur intensity={0.01} luminanceThreshold={0} />
      </EffectComposer>

      <Suspense fallback={null}>
        <Object />
      </Suspense>
    </>
  );
}
