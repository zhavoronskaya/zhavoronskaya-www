import { useGLTF, useTexture } from "@react-three/drei";
import { Mesh } from "three";

export default function Model() {
  const bakedTexture = useTexture("/shots/particles/texture/mushrooms.jpg");
  const { nodes } = useGLTF("/shots/particles/model/mushroomsUv.glb");
  const mushrooms = nodes.Plane001 as Mesh;

  return (
    <group>
      <mesh geometry={mushrooms.geometry}>
        <meshStandardMaterial map={bakedTexture} map-flipY={false} />
      </mesh>
    </group>
  );
}
