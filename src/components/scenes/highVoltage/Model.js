import { useGLTF, useTexture, Stage } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";

import * as THREE from "three";

// import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { CubeTextureLoader } from "three";

import spiralVertex from "./shaders/spiralVertex.js";
import spiralFragment from "./shaders/spiralFragment.js";
import baseVertex from "./shaders/baseVertex.js";
import baseFragment from "./shaders/baseFragment.js";

const meshesSettings = {
  Base: { type: "Base", group: "base" },
  spiralDwnL1: { type: "spiral", group: "spiral" },
  spiralDwnL2: { type: "spiral", group: "spiral" },
  spiralDwnL3: { type: "spiral", group: "spiral" },
  spiralDwnL4: { type: "spiral", group: "spiral" },
  spiralDwnR1: { type: "spiral", group: "spiral" },
  spiralDwnR2: { type: "spiral", group: "spiral" },
  spiralDwnR3: { type: "spiral", group: "spiral" },
  spiralDwnR4: { type: "spiral", group: "spiral" },
  spiralUpL1: { type: "spiral", group: "spiral" },
  spiralUpL2: { type: "spiral", group: "spiral" },
  spiralUpL3: { type: "spiral", group: "spiral" },
  spiralUpL3: { type: "spiral", group: "spiral" },
  spiralUpR1: { type: "spiral", group: "spiral" },
  spiralUpR2: { type: "spiral", group: "spiral" },
  spiralUpR3: { type: "spiral", group: "spiral" },
  spiralUpR4: { type: "spiral", group: "spiral" },
  DEFAULT: { type: "spiral", group: "spiral" },
};

function createSkyBox() {
  const loader = new CubeTextureLoader();
  const texture = loader.load([
    "/texture/highvoltage/px.png",
    "/texture/highvoltage/nx.png",
    "/texture/highvoltage/py.png",
    "/texture/highvoltage/ny.png",
    "/texture/highvoltage/pz.png",
    "/texture/highvoltage/nz.png",
  ]);
  // console.log(texture);
  return texture;
}

export default function Model({ position, ...props }) {
  const gltf = useGLTF(`../../model/highVoltage.glb?${props.yo}`);
  //  const gltf = useGLTF("../../model/highVoltage.glb");
  // const { nodes } = useGLTF("../../model/rob.glb");

  const spiralMaterialRef = useRef();

  useFrame((state, delta) => {
    if (spiralMaterialRef.current)
      spiralMaterialRef.current.uniforms.uTime.value += delta;
  });

  useEffect(() => {
    if (!gltf || !gltf.scene) return;

    console.log("gltf.scene", props.yo, gltf.scene);

    // gltf.scene.traverse((child) => {
    //   const meshSettings = meshesSettings[child.name] || meshesSettings.DEFAULT;

    //   if (child.name === "Scene") return;

    //   if (meshSettings.type === "spiral") {
    //     child.material = new THREE.ShaderMaterial({
    //       uniforms: {
    //         uTime: { value: 0 },
    //         specMap: { value: createSkyBox() },
    //       },
    //       vertexShader: spiralVertex,
    //       fragmentShader: spiralFragment,
    //     });

    //     spiralMaterialRef.current = child.material;
    //   } else {
    //     child.material = new THREE.ShaderMaterial({
    //       uniforms: { uTime: { value: 0 } },
    //       vertexShader: baseVertex,
    //       fragmentShader: baseFragment,
    //     });
    //     console.log("child", child);
    //   }
    // });
  }, [gltf]);

  return (
    <group position={position} dispose={null}>
      <primitive object={gltf.scene} />
      {/* <primitive position={new THREE.Vector3(0, 0, 10)} object={gltf.scene} /> */}
    </group>
  );
}
