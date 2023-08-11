import { MeshReflectorMaterial } from "@react-three/drei";

export default function Mirror() {
  return (
    <mesh position={[0.9, 5.6, -5.2]}>
      <planeGeometry args={[5.4, 3.6]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={2048}
        mixBlur={0.5}
        mixStrength={50}
        roughness={1}
        depthScale={100}
        minDepthThreshold={0}
        maxDepthThreshold={5.4}
        color="#121212"
        metalness={0.7}
      />
    </mesh>
  );
}
