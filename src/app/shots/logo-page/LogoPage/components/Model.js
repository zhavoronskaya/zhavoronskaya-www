import {
  useGLTF,
  MeshTransmissionMaterial,
  MeshRefractionMaterial,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function createSkyBox() {
  const loader = new THREE.CubeTextureLoader();
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
}

export default function Model(props) {
  const { nodes } = useGLTF("../../model//logo.glb");
  console.log(nodes);
  const meshRef = useRef();
  useFrame((state, delta) => {
    meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.5;
  });
  const tex = createSkyBox();

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={meshRef}
        castShadow
        geometry={nodes.Curve008.geometry}
        position={[0.0, 0.0, 0.5]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={(1.5, 1.5, 1.5)}
      >
        {/* <MeshTransmissionMaterial
          distortion={0.61}
          distortionScale={0.39}
          // color={"#42F2F7"}
          thickness={5.5}
          ior={3.12}
          roughness={0.0}
          transmission={1.3}
        /> */}

        <MeshRefractionMaterial envMap={tex} ior={1.0} fresnel={8.0} />
      </mesh>
    </group>
  );
}
