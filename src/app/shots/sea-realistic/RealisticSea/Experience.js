import { Suspense, useRef } from "react";
import React from "react";

import {
  shaderMaterial,
  OrbitControls,
  Sky,
  CameraControls,
  Clouds,
  Cloud,
} from "@react-three/drei";

import watherVertexShader from "./shaders/vertex.js";
import watherFragmentShader from "./shaders/fragment.js";

import * as THREE from "three";
import { useFrame, extend, useThree } from "@react-three/fiber";

import {
  DepthOfField,
  Bloom,
  EffectComposer,
} from "@react-three/postprocessing";

const SeaWaterMaterial = shaderMaterial(
  {
    uTime: 0,
  },

  watherVertexShader,
  watherFragmentShader
);
extend({ SeaWaterMaterial });

function Sea() {
  const { viewport } = useThree();
  const shaderRef = useRef();
  const geomertyRef = useRef();
  const ref = useRef();
  const shaderWaveRef = useRef();
  const look = new THREE.Vector3(20, 5, -30);
  // const position = new THREE.Vector3(20, 4, -20);
  const camera = useThree((state) => state.camera);
  React.useEffect(() => {
    camera.lookAt(look.x, look.y, look.z);
    camera.updateProjectionMatrix();
  }, []);

  useFrame((state, delta) => {
    state.camera.lookAt(look.x, look.y, look.z);
    state.camera.updateProjectionMatrix();
    if (shaderRef.current) {
      shaderRef.current.uTime += delta * 0.5;

      // console.log(viewport.width, viewport.height);
    }

    if (shaderWaveRef.current) {
      shaderWaveRef.current.uTime += delta * 0.3;
      shaderWaveRef.current.uResolution = new THREE.Vector2(
        viewport.width,
        viewport.height
      );
    }
    // if (shaderRef.current) shaderRef.current.uTime += delta * 0.07;
    // ref.current.rotation.y += delta;
    // state.camera.fov = Math.sin(state.clock.getElapsedTime()) * 20 + 45;
    // state.camera.updateProjectionMatrix();
  });

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} ref={ref}>
        <planeGeometry ref={geomertyRef} args={[20, 20, 2056, 1024]} />
        <seaWaterMaterial ref={shaderRef} />
      </mesh>
    </group>
  );
}

export default function Experience() {
  return (
    <>
      {/* <CameraControls /> */}
      {/* <OrbitControls /> */}
      {/* <EffectComposer>
        <DepthOfField
          focusDistance={0.025}
          focalLength={0.15}
          bokehScale={0.5}
        />
        <Bloom mipmapBlur intensity={0.1} luminanceThreshold={0} />
      </EffectComposer> */}

      <color args={["#a7b6db"]} attach="background" />
      <ambientLight intensity={Math.PI / 1.5} />
      <Sky inclination={0.5} azimuth={Math.PI} rayleigh={2.7} turbidity={3} />
      <Clouds material={THREE.MeshLambertMaterial}>
        <Cloud
          segments={20}
          position={[0, 7, 0]}
          bounds={[5, 3, 5]}
          scale={2}
          volume={5}
          color="f0d698"
          speed={0.7}
        />
        <Cloud
          segments={6}
          position={[0, 7, 0]}
          bounds={[5, 3, 5]}
          seed={1}
          scale={2}
          volume={10}
          color="#f26698"
          fade={50}
          speed={0.7}
        />
      </Clouds>
      <Suspense fallback={null}>
        <Sea />
      </Suspense>
    </>
  );
}
