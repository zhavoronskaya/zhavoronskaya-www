import {
  shaderMaterial,
  OrbitControls,
  Point,
  Points,
  useGLTF,
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

const count = 100000;
const size = 80;

const ParticlesMaterialFiveteen = new shaderMaterial(
  { uSize: 80, uTime: 0 },
  pointsVertexShader,
  pointsFragmentShader
);

extend({ ParticlesMaterialFiveteen });

function Particles() {
  const shaderRef = useRef();
  const pointsRef = useRef();
  const { nodes } = useGLTF("../../model//tree1.glb");
  console.log(nodes.tree1.geometry.attributes.position.array);
  useFrame((state, delta) => {
    // if (shaderRef.current)
    //   shaderRef.current.uTime += state.clock.getElapsedTime() * 0.0051;

    if (shaderRef.current) shaderRef.current.uTime += delta * 0.5;
  });
  console.log(nodes.tree1.geometry.attributes.position.count);

  return (
    <Points limit={100000} rotation={[0, 0, 0]}>
      <particlesMaterialFiveteen
        ref={shaderRef}
        transparent={true}
        uSize={size}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
      />
      {Array.from({
        length: nodes.tree1.geometry.attributes.position.count,
      }).map((_, i) => {
        const tetha = Math.random();
        const phi = Math.random();
        const position = [
          nodes.tree1.geometry.attributes.position.array[i],
          nodes.tree1.geometry.attributes.position.array[i + 1],
          nodes.tree1.geometry.attributes.position.array[i + 2],
        ];

        // const i1 = i * 3;
        // const position = [
        //   nodes.tree1.geometry.attributes.position.array[i1],
        //   nodes.tree1.geometry.attributes.position.array[i1 + 1],
        //   nodes.tree1.geometry.attributes.position.array[i1 + 2],
        // ];
        const scale = Math.random() * size;

        return <Point key={i} position={position} size={scale} />;
      })}
    </Points>
  );
}

export default function Experience() {
  return (
    <>
      {/* <OrbitControls /> */}
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
      <color args={["#02191c"]} attach="background" />
      <Suspense fallback={null}>
        <Particles />
      </Suspense>
    </>
  );
}
