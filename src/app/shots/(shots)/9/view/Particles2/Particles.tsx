import { useRef, useEffect, useMemo } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import particlesVertexShader from "./shaders/particles/vertex";
import particlesFragmentShader from "./shaders/particles/fragment";

import { Point, Points, useGLTF } from "@react-three/drei";
import { isMesh } from "@/helpers/Object3d";

const size = 80;
const uniforms = {
  uTime: new THREE.Uniform(0),
  uSize: new THREE.Uniform(size),
};

function Particles() {
  const shaderRef = useRef<THREE.ShaderMaterial | null>(null);

  const { nodes } = useGLTF("/shots/particles/model/tree2.glb");
  const tree = nodes.tree1 as THREE.Mesh;

  useFrame((state, delta) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value += delta * 0.5;
    }
  });

  const length = tree.geometry.attributes.position.count ?? 0;

  return (
    <Points limit={100000}>
      <shaderMaterial
        ref={shaderRef}
        vertexShader={particlesVertexShader}
        fragmentShader={particlesFragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
        transparent={true}
      />

      {Array.from({ length }).map((_, i) => {
        //specially not exactly correct, correct with i*3
        const i3 = i * 2;
        const position = [
          tree.geometry.attributes.position.array[i3],
          tree.geometry.attributes.position.array[i3 + 1],
          tree.geometry.attributes.position.array[i3 + 2],
        ] as const;

        const scale = Math.random() * size;

        return <Point key={i} position={position} size={scale} />;
      })}
    </Points>
  );
}

export default Particles;
