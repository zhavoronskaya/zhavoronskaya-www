import { useGLTF, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Model(props) {
  const { nodes } = useGLTF("../../model//logo.glb");
  console.log(nodes);
  const meshRef = useRef();
  useFrame((state, delta) => {
    meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.5;
  });

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
        <MeshTransmissionMaterial
          distortion={0.61}
          distortionScale={0.39}
          // color={"#42F2F7"}
          thickness={1.5}
          ior={3.12}
          roughness={0.0}
          transmission={1.0}
        />
      </mesh>
    </group>
  );
}
