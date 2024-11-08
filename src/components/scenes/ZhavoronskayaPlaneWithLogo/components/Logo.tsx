import { useGLTF, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Logo() {
  const { nodes } = useGLTF("../../model//logo.glb") as any;

  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <group dispose={null}>
      <mesh
        ref={meshRef}
        castShadow
        geometry={nodes.Curve008.geometry}
        position={[0.0, 0.0, 0.5]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={1.5}
      >
        <MeshTransmissionMaterial
          distortion={0.61}
          distortionScale={0.39}
          // color={"cyan"}
          thickness={1.5}
          ior={3.12}
          roughness={0.0}
          transmission={1.0}
          temporalDistortion={1}
        />
      </mesh>
    </group>
  );
}
