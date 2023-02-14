import { Suspense, useEffect, useRef, useState } from "react";
import React from "react";

import { shaderMaterial, OrbitControls, Stage } from "@react-three/drei";

import paintingVertexShader from "./shaders/vertex.js";
import paintingFragmentShader from "./shaders/fragment.js";

import { useThree, useFrame, extend } from "@react-three/fiber";

import { EffectComposer, SSR } from "@react-three/postprocessing";

const FigureMaterial = shaderMaterial(
  {
    uTime: 0,
  },
  paintingVertexShader,
  paintingFragmentShader
);
extend({ FigureMaterial });

function Object() {
  const shaderRef = useRef();
  const geomertyRef = useRef();
  const ref = useRef();
  const { width, height } = useThree((state) => state.size);

  useFrame((state, delta) => {
    if (shaderRef.current) shaderRef.current.uTime += delta * 0.1;
  });

  return (
    <mesh ref={ref}>
      <torusKnotGeometry ref={geomertyRef} args={[1.5, 0.3, 512, 512]} />
      <figureMaterial ref={shaderRef} />
    </mesh>
  );
}

export default function Experience() {
  return (
    <>
      {/* <OrbitControls /> */}
      <EffectComposer>
        <SSR
          temporalResolve={true}
          STRETCH_MISSED_RAYS={true}
          USE_MRT={true}
          USE_NORMALMAP={true}
          USE_ROUGHNESSMAP={true}
          ENABLE_JITTERING={true}
          ENABLE_BLUR={true}
          temporalResolveMix={0.9}
          temporalResolveCorrectionMix={0.25}
          maxSamples={0}
          resolutionScale={1}
          blurMix={0.2}
          blurKernelSize={4}
          blurSharpness={0.5}
          rayStep={0.3}
          intensity={1}
          maxRoughness={0.1}
          jitter={0.1}
          jitterSpread={0.45}
          jitterRough={0.1}
          roughnessFadeOut={1}
          rayFadeOut={0}
          MAX_STEPS={20}
          NUM_BINARY_SEARCH_STEPS={5}
          maxDepthDifference={3}
          maxDepth={1}
          thickness={40}
          ior={1.45}
        />
      </EffectComposer>

      <color args={["#F3CBFE"]} attach="background" />

      <Suspense fallback={null}>
        <Stage
          contactShadow={{ opacity: 0.5, blur: 3 }}
          environment="sunset"
          preset="portrait"
          intensity={2}
        >
          <Object castShadow />
        </Stage>
      </Suspense>
    </>
  );
}
