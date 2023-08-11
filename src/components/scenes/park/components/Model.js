import * as THREE from "three";
import React from "react";
import { Stage, useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const gltf = useGLTF("/model/baseGround.glb");
  const bakedTexture = useTexture("../../model/base.jpg");
  const wallsTexture = useTexture("../../model/walls.jpg");
  const groundTexture = useTexture("../../model/ground.jpg");
  wallsTexture.flipY = false;
  bakedTexture.flipY = false;
  groundTexture.flipY = false;

  console.log("gltf", gltf);
  console.log("bakedTexture", bakedTexture);
  console.log("wallsTexture", wallsTexture);
  console.log("groundTexture", groundTexture);

  // bakedTexture.colorSpace = THREE.SRGBColorSpace;
  // const gltfhv = useGLTF("/model/highVoltage.glb");

  //const levetl1 = useGLTF("/model/level1.glb");
  // console.log("gltfhv", gltfhv);
  console.log("gltf", gltf);

  React.useEffect(() => {
    if (!gltf || !gltf.scene) return;

    console.log("gltf", gltf);

    gltf.scene.traverse((child) => {
      if (child.name === "Scene") return;

      console.log("child", child.name);

      child.material = new THREE.MeshBasicMaterial();

      if (child.name === "Rock") {
        child.material.map = bakedTexture;
      } else if (child.name === "Walls") {
        child.material.map = wallsTexture;
      } else if (child.name === "Ground") {
        child.material.map = groundTexture;
      }
    });
  });
  return (
    <>
      {/* <mesh geometry={gltf.nodes.Rock.geometry}>
        <meshBasicMaterial map={bakedTexture} map-flipY={false} />
      </mesh> */}
      <primitive object={gltf.scene} position={[-30, -86, 22]} />
      {/* <primitive object={levetl1.scene} position={[-30, -86, 22]}></primitive> */}
      {/* <primitive object={gltfhv.scene} /> */}
      {/*  <primitive object={gltf.scene} /> */}
    </>
  );
}
