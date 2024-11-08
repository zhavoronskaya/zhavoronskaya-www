import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import React from "react";

import hologramVertexShader from "./shaders/hologram/vertex.js";
import hologramFragmentShader from "./shaders/hologram/fragment.js";

import { useThree, useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";

function Hologram() {
  const flower = useGLTF("../../model/flower.glb");
  const shaderRef = useRef();

  const uniforms = useRef({
    uTime: new THREE.Uniform(0),
  });
  useFrame((state, delta) => {
    shaderRef.current.uniforms.uTime.value += delta * 0.5;
  });
  return (
    <mesh geometry={flower.scene.children[1].geometry}>
      {/* <sphereGeometry /> */}
      <shaderMaterial
        ref={shaderRef}
        vertexShader={hologramVertexShader}
        fragmentShader={hologramFragmentShader}
        transparent={true}
        uniforms={uniforms.current}
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default Hologram;
