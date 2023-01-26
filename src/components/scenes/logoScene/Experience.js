import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Environment } from "@react-three/drei";
import React from "react";
import styles from "./Canvas.module.css";
import { BlendFunction } from "postprocessing";

import {
  shaderMaterial,
  OrbitControls,
  useTexture,
  Html,
} from "@react-three/drei";

import paintingVertexShader from "./shaders/vertex.js";
import paintingFragmentShader from "./shaders/fragment.js";

import * as THREE from "three";
import { useThree, useFrame, extend } from "@react-three/fiber";

import {
  DepthOfField,
  Bloom,
  EffectComposer,
  Noise,
} from "@react-three/postprocessing";

import Post from "./Post";

// Texture loader
// const textureLoader = new THREE.TextureLoader();
// const textWater = textureLoader.load("/public/image/cover.png");
// textWater.encoding = THREE.sRGBEncoding;

const LogoMaterial = shaderMaterial(
  {
    uTime: 0,
    uTex: new THREE.Texture(),
  },
  paintingVertexShader,
  paintingFragmentShader
);
extend({ LogoMaterial });

function Painting() {
  const geomertyRef = useRef();
  const { width, height } = useThree((state) => state.size);

  const logo = useRef();

  return (
    <mesh ref={logo} key="stable">
      <planeGeometry
        ref={geomertyRef}
        args={[width / 60, height / 60, 128, 128]}
      />
      <PaintingMaterial />
      {/* <logoMaterial ref={shaderRef} /> */}
      {/* <meshBasicMaterial map={textWater} /> */}
    </mesh>
  );
}

const PaintingMaterial = React.memo(() => {
  const textLogo = useTexture("./image/logoBlue.png");
  textLogo.encoding = THREE.sRGBEncoding;

  textLogo.minFilter = THREE.NearestFilter;
  textLogo.magFilter = THREE.NearestFilter;
  textLogo.generateMipmaps = false;

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
      vertexShader={paintingVertexShader}
      fragmentShader={paintingFragmentShader}
      // transparent={true}
      uniforms={{
        uTime: { value: 12 },
        uTex: { value: textLogo },
        // uDataTexture: { value: texture },
      }}
    />
  );
});

export default function Experience() {
  const { viewport } = useThree();
  useFrame((state) => {
    state.gl.clear();
  });
  // const postRef = useRef();
  // useFrame(({ mouse }) => {
  //   // const angle = state.clock.elapsedTime;

  //   const x = (mouse.x + 1) * 0.5;
  //   const y = (mouse.y + 1) * 0.5;
  //   const uMouse = new THREE.Vector2(x, y);
  //   // console.log(postRef.current);
  //   // postRef.current.uniforms.uMouse.value = uMouse;
  //   // console.log(postRef.current);
  //   // state.camera.position.x =
  //   //   Math.abs(Math.sin((angle * Math.PI) / 70) / 1.4) * 14;
  //   // state.camera.position.z =
  //   //   Math.abs(Math.cos((angle * Math.PI) / 70) / 1.4) * 14;
  //   // state.camera.position.y =
  //   //   Math.abs(Math.sin((angle * Math.PI) / 70) / 1.4) * 14;
  //   // state.camera.lookAt(0, 0.5, 0);
  //   // state.camera.updateProjectionMatrix();
  // });

  return (
    <>
      {/* <OrbitControls /> */}

      <EffectComposer multisampling={4} autoClear={false}>
        <Post />
        {/* <DepthOfField focusDistance={0.25} focalLength={0.25} bokehScale={3} /> */}
        {/* <Bloom mipmapBlur intensity={0.63} luminanceThreshold={0.5} /> */}
        {/* <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHTrew} /> */}
      </EffectComposer>

      <color args={["#F3CBFE"]} attach="background" />
      <Suspense fallback={null}>
        <Painting />
      </Suspense>
    </>
  );
}
