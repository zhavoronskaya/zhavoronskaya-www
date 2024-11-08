import { useEffect, useRef } from "react";
import { useGLTF, MeshTransmissionMaterial } from "@react-three/drei";
import React from "react";

import lightingVertexShader from "./shaders/lighting/vertex.js";
import lightingFragmentShader from "./shaders/lighting/fragment.js";

import { useThree, useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";

function LightingObject({ visible }) {
  const rose = useGLTF("../../model/rose.glb");
  const shaderRef = useRef();
  const meshRef = useRef();
  const groupRef = useRef();
  const transmissionRef = useRef();
  const transmissionShaderRef = useRef();

  const uniforms = useRef({
    uTime: new THREE.Uniform(0),
  });
  useEffect(() => {
    console.log(rose);
  }, []);

  useFrame((state, delta) => {
    shaderRef.current.uniforms.uTime.value += delta;
    // groupRef.current.rotation.z += delta * 0.5;
  });
  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* <mesh>
        <octahedronGeometry args={[1, 64]} />
        <shaderMaterial
          ref={shaderRef}
          vertexShader={lightingVertexShader}
          fragmentShader={lightingFragmentShader}
          transparent={false}
          uniforms={uniforms.current}
          side={THREE.DoubleSide}
        />
      </mesh> */}
      <mesh scale={[6, 8, 6]} position={[0, 0, 0]}>
        <icosahedronGeometry />
        <octahedronGeometry />
        <MeshTransmissionMaterial
          distortion={1.0}
          distortionScale={0.09}
          thickness={1.0}
          ior={1.03}
          roughness={0.0}
          transmission={1.0}
          background={"aqua"}
          chromaticAberration={0.02}
          anisotropicBlur={0.8}
        />
      </mesh>
      <mesh
        geometry={rose.scene.children[0].children[0].geometry}
        ref={meshRef}
      >
        <shaderMaterial
          ref={shaderRef}
          vertexShader={lightingVertexShader}
          fragmentShader={lightingFragmentShader}
          transparent={false}
          uniforms={uniforms.current}
        />
      </mesh>
      <mesh
        geometry={rose.scene.children[0].children[1].geometry}
        ref={meshRef}
      >
        <shaderMaterial
          ref={shaderRef}
          vertexShader={lightingVertexShader}
          fragmentShader={lightingFragmentShader}
          transparent={false}
          uniforms={uniforms.current}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export default LightingObject;
