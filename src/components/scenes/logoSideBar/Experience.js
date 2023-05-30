import { Suspense, useEffect, useRef, useState } from "react";
import React from "react";

import { OrbitControls, useAspect, useTexture } from "@react-three/drei";

import logoVertexShader from "./shaders/vertex.js";
import logoFragmentShader from "./shaders/fragment.js";

import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";

import { EffectComposer } from "@react-three/postprocessing";
import Post from "./Post";

function Logo() {
  const geomertyRef = useRef();
  const { viewport } = useThree();
  const logo = useRef();

  return (
    <mesh ref={logo} key="stable">
      <planeGeometry
        ref={geomertyRef}
        args={[viewport.width, viewport.height, 64, 32]}
      />
      <LogoMaterial />
    </mesh>
  );
}

const LogoMaterial = React.memo(() => {
  const textLogo = useTexture("/image/logoSideBarTr.png");
  textLogo.encoding = THREE.sRGBEncoding;

  // textLogo.minFilter = THREE.NearestFilter;
  // textLogo.magFilter = THREE.NearestFilter;
  // textLogo.generateMipmaps = false;
  const shaderRef = useRef();

  useEffect(() => {
    shaderRef.current.uTex = textLogo;
  }, []);

  useFrame((state, delta) => {
    if (shaderRef.current) {
      //console.log("upd", Math.round(shaderRef.current.uniforms.uTime.value));
      shaderRef.current.uniforms.uTime.value += delta * 0.3;
    }
  });

  return (
    <shaderMaterial
      ref={shaderRef}
      key="stable"
      transparent
      vertexShader={logoVertexShader}
      fragmentShader={logoFragmentShader}
      vertexColors={true}
      uniforms={{
        uTime: { value: 1 },
        uTex: { value: textLogo },
      }}
    />
  );
});

export default function Experience() {
  return (
    <>
      {/* <OrbitControls /> */}
      <EffectComposer>
        <Post />
      </EffectComposer>

      <color args={["#F3CBFE"]} attach="background" />

      <Suspense fallback={null}>
        <Logo />
      </Suspense>
    </>
  );
}
