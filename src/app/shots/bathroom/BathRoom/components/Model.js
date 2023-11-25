import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const bakedTexture = useTexture("../../model/bakedBathroomWhite.jpg");
  const { nodes } = useGLTF("../../model//bathroom.glb");
  console.log(nodes);

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.baked.geometry}
        position={[0.9, 0.34, -1.47]}
        rotation={[0, 0, 0]}
      >
        <meshBasicMaterial map={bakedTexture} map-flipY={false} />
      </mesh>
    </group>
  );
}
