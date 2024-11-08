import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const bakedTexture = useTexture("../../texture/seaa.jpg");
  const { nodes } = useGLTF("../../model//seaa.glb");
  console.log(nodes);

  return (
    <group {...props} dispose={null} rotation={[0, (-5 * Math.PI) / 6, 0]}>
      <mesh geometry={nodes.sea.geometry}>
        <meshBasicMaterial map={bakedTexture} map-flipY={false} />
      </mesh>
    </group>
  );
}
