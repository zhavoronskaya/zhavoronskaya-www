import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import React from "react";

import lightingVertexShader from "./shaders/lighting/vertex.js";
import lightingFragmentShader from "./shaders/lighting/fragment.js";

import { useThree, useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";

function LightingObject() {
  const flower = useGLTF("../../model/flower.glb");
  const shaderRef = useRef();

  const uniforms = useRef({
    uTime: new THREE.Uniform(0),
  });
  useFrame((state, delta) => {
    shaderRef.current.uniforms.uTime.value += delta * 0.5;
  });
  return (
    <mesh geometry={flower.scene.children[0].geometry}>
      {/* <sphereGeometry /> */}
      <shaderMaterial
        ref={shaderRef}
        vertexShader={lightingVertexShader}
        fragmentShader={lightingFragmentShader}
        transparent={false}
        uniforms={uniforms.current}
        // blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default LightingObject;
