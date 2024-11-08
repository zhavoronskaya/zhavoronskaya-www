import { useRef, useEffect, useMemo } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import particlesVertexShader from "./shaders/particles/vertex";
import particlesFragmentShader from "./shaders/particles/fragment";

import { Point, Points, useGLTF } from "@react-three/drei";
import { isMesh } from "@/helpers/Object3d";

const count = 7000;
const size = 800;
const radius = 30.0;
const uniforms = {
  uTime: new THREE.Uniform(0),
  uSize: new THREE.Uniform(size),
};

const points = Array.from({ length: count }).map((_, i) => {
  const i3 = i * 3;

  const spherical = new THREE.Spherical(
    radius * (0.25 + Math.random() * 0.75),
    Math.random() * Math.PI,
    Math.random() * Math.PI * 2
  );

  const position = new THREE.Vector3();
  position.setFromSpherical(spherical);
  const scale = Math.random() * size;

  return <Point key={i} position={position} size={scale} />;
});

function Particles() {
  const shaderRef = useRef<THREE.ShaderMaterial | null>(null);

  useFrame((state, delta) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value += delta * 0.1;
    }
  });

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
      {points}
    </Points>
  );
}

export default Particles;
