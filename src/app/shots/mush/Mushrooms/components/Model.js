import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const bakedTexture = useTexture("../../texture/mushrooms.jpg");
  const { nodes } = useGLTF("../../model//mushroomsUv.glb");
  console.log(nodes);

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Plane001.geometry}>
        <meshBasicMaterial map={bakedTexture} map-flipY={false} />
      </mesh>
    </group>
  );
}
