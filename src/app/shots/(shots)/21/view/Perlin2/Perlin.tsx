import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import vertexShader from "./shaders/perlin/vertex";
import fragmentShader from "./shaders/perlin/fragment";
import { stat } from "fs";

const uniforms = {
  uTime: new THREE.Uniform(0),
};

function Perlin() {
  const shaderRef = useRef<THREE.ShaderMaterial | null>(null);
  useFrame((state, delta) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value += delta * 0.07;
    }
  });
  // rotation={[-Math.sin(Math.PI / 4), 0, 0]}
  return (
    <mesh rotation={[-Math.PI / 4, 0, 0]}>
      <planeGeometry args={[3, 6, 512, 256]} />
      <shaderMaterial
        ref={shaderRef}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe
      />
    </mesh>
  );
}

export default Perlin;
