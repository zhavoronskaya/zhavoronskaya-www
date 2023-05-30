import { Suspense, useEffect, useRef, useState } from "react";
import React from "react";

import {
  OrbitControls,
  useTexture,
  RandomizedLight,
  AccumulativeShadows,
} from "@react-three/drei";

import logoVertexShader from "./shaders/vertex.js";
import logoFragmentShader from "./shaders/fragment.js";

import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";

import { EffectComposer } from "@react-three/postprocessing";
import Post from "./Post";
import Model from "./components/Model";

function Logo() {
  const geomertyRef = useRef();
  const { viewport } = useThree();
  const logo = useRef();

  return (
    <mesh ref={logo} key="stable">
      <planeGeometry
        ref={geomertyRef}
        args={[window.innerWidth / 70, window.innerHeight / 70, 64, 32]}
      />
      <LogoMaterial />
    </mesh>
  );
}

const LogoMaterial = React.memo(() => {
  const textLogo = useTexture("./image/logoBlueTr.png");
  textLogo.encoding = THREE.sRGBEncoding;
  textLogo.flipY = true;

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
      shaderRef.current.uniforms.uTime.value += delta * 0.5;
    }
  });
  const { viewport } = useThree();

  return (
    <shaderMaterial
      ref={shaderRef}
      key="stable"
      vertexShader={logoVertexShader}
      fragmentShader={logoFragmentShader}
      vertexColors={true}
      transparent
      uniforms={{
        uTime: { value: 0 },
        uTex: { value: textLogo },
        // uResolution: {
        //   value: new THREE.Vector2(viewport.width, viewport.height),
        // },
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
      <ambientLight />

      <Suspense fallback={null}>
        <Logo />
        <Model />
      </Suspense>
    </>
  );
}
