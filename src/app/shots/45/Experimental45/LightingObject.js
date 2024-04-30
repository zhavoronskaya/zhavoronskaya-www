import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import React from "react";

import lightingVertexShader from "./shaders/lighting/vertex.js";
import lightingFragmentShader from "./shaders/lighting/fragment.js";

import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";

function LightingObject() {
  const heart = useGLTF("../../model/humanheart.glb");
  const shaderRef = useRef();
  const meshRef = useRef();

  const uniforms = useRef({
    uTime: new THREE.Uniform(0),
    uProgress: new THREE.Uniform(0),
  });
  const runAnimation = () => {
    const destroy = () => {
      runAnimation();
    };
    gsap.fromTo(
      uniforms.current.uProgress,
      { value: 0 },
      {
        value: 1,
        duration: 6,
        ease: "linear",
        onComplete: destroy,
      }
    );
  };
  //animation
  useEffect(() => {
    runAnimation();
    console.log(heart.scene.children[0].geometry);
    // meshRef.current.geometry = mergeVertices(meshRef.current.geometry);
    // meshRef.current.geometry.computeTangents();
    // console.log(meshRef.current.geometry);
  }, []);
  useFrame((state, delta) => {
    shaderRef.current.uniforms.uTime.value += delta * 0.9;
    // state.camera.fov = 45 - delta * Math.random() * 40.0;
    // state.camera.updateProjectionMatrix();
  });
  return (
    <mesh ref={meshRef} geometry={heart.scene.children[0].geometry}>
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
