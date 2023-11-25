import { Suspense, useEffect, useRef } from "react";
import React from "react";

import { shaderMaterial, OrbitControls, Environment } from "@react-three/drei";

import spaceVertexShader from "./shaders/vertex.js";
import spaceFragmentShader from "./shaders/fragment.js";

import * as THREE from "three";
import { useFrame, extend, useThree } from "@react-three/fiber";

import {
  DepthOfField,
  Bloom,
  EffectComposer,
} from "@react-three/postprocessing";
import { CubeTextureLoader, textureLoader } from "three";

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

  // const textureLoader = new THREE.TextureLoader();
  // const environmentMap = textureLoader.load(
  //   "/texture/alonetogether/sky_extra_colored_milkyway_in_the_space_without_gr.jpg"
  // );

  // environmentMap.mapping = THREE.EquirectangularReflectionMapping;
  // environmentMap.colorSpace = THREE.SRGBColorSpace;
  // environmentMap.envMapIntensity = 100;
  // return environmentMap;
}
function createEnvironment() {
  const textureLoader = new THREE.TextureLoader();
  const environmentMap = textureLoader.load(
    "/texture/alonetogether/sky_extra_colored_milkyway_in_the_space_without_gr.jpg"
  );

  environmentMap.mapping = THREE.EquirectangularReflectionMapping;
  environmentMap.colorSpace = THREE.SRGBColorSpace;
  environmentMap.envMapIntensity = 4;
  return environmentMap;
}

const SpaceShipMaterial = shaderMaterial(
  {
    uTime: 0,
    specMap: null,
  },

  spaceVertexShader,
  spaceFragmentShader
);
extend({ SpaceShipMaterial });

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
    state.camera.fov = Math.sin(state.clock.getElapsedTime()) * 2 + 45;
    state.camera.updateProjectionMatrix();
  });
  const { scene } = useThree();
  // console.log(scene);
  scene.background = createEnvironment();
  // scene.environment = createEnvironment();
  return (
    <mesh ref={ref}>
      <icosahedronGeometry ref={geomertyRef} args={[2, 128]} />
      <spaceShipMaterial ref={shaderRef} />
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
