"use client";
import React, { useRef } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import logoVertexShader from "../shaders/vertex.js";
import logoFragmentShader from "../shaders/fragment.js";

export default function DecorativeText() {
  const textLogo = useTexture("./image/logoBlueTr.png");
  const three = useThree();
  const initialUniforms = useRef({
    uTime: { value: 0 },
    uTex: { value: textLogo },
  });

  textLogo.encoding = THREE.sRGBEncoding;
  textLogo.flipY = true;

  const logo = React.useRef<THREE.Mesh>(null);
  const geomertyRef = React.useRef<THREE.PlaneGeometry>(null);
  const materialRef = React.useRef<THREE.ShaderMaterial>(null);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta * 0.5;
    }
  });

  return (
    <mesh ref={logo}>
      <planeGeometry
        ref={geomertyRef}
        args={[three.size.width / 100, three.size.height / 200, 64, 32]}
        // args={[window.innerWidth / 70, window.innerHeight / 70, 64, 32]}
      />
      <shaderMaterial
        ref={materialRef}
        vertexShader={logoVertexShader}
        fragmentShader={logoFragmentShader}
        vertexColors={true}
        transparent
        uniforms={initialUniforms.current}
      />
    </mesh>
  );
}
