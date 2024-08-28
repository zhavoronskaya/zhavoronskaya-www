import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import vertexShader from "./shaders/transparent/vertex";
import fragmentShader from "./shaders/transparent/fragment";

import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei";

const backgroundColor = new THREE.Color("#010e17");

const uniforms = {
  uTime: new THREE.Uniform(0),
  uIterration: new THREE.Uniform(4),
};

function Transparent() {
  const shaderRef = useRef<THREE.ShaderMaterial | null>(null);

  const meshRef = useRef<THREE.Mesh | null>(null);

  const { nodes } = useGLTF("/shots/transparent/model/meduze.glb");
  const meduze = nodes.Sphere as THREE.Mesh;

  useFrame((state, delta) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value += delta * 1.5;
    }

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime());
    }
  });

  return (
    <group>
      <mesh>
        <sphereGeometry args={[4.0, 512, 512]} />
        <MeshTransmissionMaterial
          distortion={0.1}
          distortionScale={0.3}
          thickness={1.0}
          ior={1.5}
          roughness={0.0}
          transmission={1.0}
          chromaticAberration={4.0}
          anisotropicBlur={2.3}
          background={backgroundColor}
        />
      </mesh>
      <mesh geometry={meduze.geometry} ref={meshRef}>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          ref={shaderRef}
          wireframe={false}
          transparent={true}
        />
      </mesh>
    </group>
  );
}

export default Transparent;
