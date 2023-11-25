"use client";
import React from "react";
import { Mesh, PlaneGeometry, ShaderMaterial, sRGBEncoding } from "three";
import { useTexture } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import logoVertexShader from "./shaders/vertex.js";
import logoFragmentShader from "./shaders/fragment.js";

export default function Logo() {
  const { viewport } = useThree();
  const textLogo = useTexture("/image/logoBlueTr.png");
  // textLogo.encoding = sRGBEncoding;
  // textLogo.minFilter = THREE.NearestFilter;
  // textLogo.magFilter = THREE.NearestFilter;
  // textLogo.generateMipmaps = false;

  const logo = React.useRef<Mesh>(null);
  const geomertyRef = React.useRef<PlaneGeometry>(null);
  const materialRef = React.useRef<ShaderMaterial>(null);
  const initialUniforms = React.useRef({
    uTime: { value: 1 },
    uTex: { value: textLogo },
  });

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta * 0.3;
    }
  });

  return (
    <mesh ref={logo}>
      <planeGeometry
        ref={geomertyRef}
        args={[viewport.width, viewport.height, 64, 128]}
      />
      <shaderMaterial
        ref={materialRef}
        transparent
        vertexShader={logoVertexShader}
        fragmentShader={logoFragmentShader}
        vertexColors={true}
        uniforms={initialUniforms.current}
      />
    </mesh>
  );
}
