import { MeshReflectorMaterial } from "@react-three/drei";

export default function Mirror() {
  return (
    <>
      <mesh position={[0.9, 5.6, -5.2]}>
        <planeGeometry args={[5.4, 3.6]} />
        <MeshReflectorMaterial
          blur={[100, 100]}
          resolution={2048}
          mixBlur={0}
          mixStrength={2000}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.5}
        />
      </mesh>
    </>
  );
}
