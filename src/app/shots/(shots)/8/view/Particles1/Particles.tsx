import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import particlesVertexShader from "./shaders/particles/vertex";
import particlesFragmentShader from "./shaders/particles/fragment";

import { Point, Points } from "@react-three/drei";

const count = 10000;
const size = 800;
const points = Array.from({ length: count }).map((_, i) => {
  const position = [
    (Math.random() - 0.5) * 5.0,
    (Math.random() - 0.5) * 5.0,
    (Math.random() - 0.5) * 5.0,
  ] as const;

  const scale = Math.random() * size;

  return <Point key={i} position={position} size={scale} />;
});

function Particles() {
  const shaderRef = useRef<THREE.ShaderMaterial | null>(null);
  const uniforms = useRef({
    uTime: new THREE.Uniform(0),
    uSize: new THREE.Uniform(size),
  });

  useFrame((state, delta) => {
    if (shaderRef.current)
      shaderRef.current.uniforms.uTime.value += delta * 0.1;
  });

  return (
    <Points limit={10000}>
      <shaderMaterial
        ref={shaderRef}
        vertexShader={particlesVertexShader}
        fragmentShader={particlesFragmentShader}
        uniforms={uniforms.current}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
        transparent={true}
      />

      {points}
    </Points>
  );
}

export default Particles;
