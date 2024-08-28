import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import vertexShader from "./shaders/transparent/vertex";
import fragmentShader from "./shaders/transparent/fragment";

import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei";

const uniforms = {
  uTime: new THREE.Uniform(0),
};

function Transparent() {
  const shaderRef = useRef<THREE.ShaderMaterial | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);

  const { nodes } = useGLTF("/shots/transparent/model/rose.glb");
  const rose = nodes.rose as THREE.Mesh;
  useFrame((state, delta) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value += delta;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh scale={[6, 8, 6]} position={[0, 0, 0]}>
        <octahedronGeometry />
        <MeshTransmissionMaterial
          distortion={1.0}
          distortionScale={0.09}
          thickness={1.0}
          ior={1.03}
          roughness={0.0}
          transmission={1.0}
          // background={backgroundColor}
          chromaticAberration={0.02}
          anisotropicBlur={0.8}
        />
      </mesh>
      <mesh geometry={rose.geometry} ref={meshRef}>
        <shaderMaterial
          ref={shaderRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
        />
      </mesh>
    </group>
  );
}

export default Transparent;
