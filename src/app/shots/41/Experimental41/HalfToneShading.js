import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import React from "react";

import halftoneVertexShader from "./shaders/halftone/vertex.js";
import halftoneFragmentShader from "./shaders/halftone/fragment.js";

import { useThree, useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";

function HalfToneShading() {
  const star = useGLTF("../../model/star.glb");
  const shaderRef = useRef();
  const meshRef = useRef();
  const { state, viewport } = useThree();

  const uniforms = useRef({
    uTime: new THREE.Uniform(0),
    uResolution: new THREE.Uniform(new THREE.Vector2(0, 0)),
  });

  useFrame((state, delta) => {
    shaderRef.current.uniforms.uTime.value += delta * 0.5;

    shaderRef.current.uniforms.uResolution.value = new THREE.Vector2(
      state.size.width,
      state.size.height
    );
    // meshRef.current.rotation.y += delta * 3.0;
  });
  return (
    <mesh
      ref={meshRef}
      geometry={star.scene.children[0].geometry}
      position={[-20, 6, 60]}
      scale={[6, 6, 6]}
    >
      {/* <sphereGeometry /> */}
      <shaderMaterial
        ref={shaderRef}
        vertexShader={halftoneVertexShader}
        fragmentShader={halftoneFragmentShader}
        transparent={false}
        uniforms={uniforms.current}
        // blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default HalfToneShading;
