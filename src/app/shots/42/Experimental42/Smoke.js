import { useRef } from "react";
import { useTexture } from "@react-three/drei";
import React from "react";

import smokeVertexShader from "./shaders/smoke/vertex.js";
import smokeFragmentShader from "./shaders/smoke/fragment.js";

import { useThree, useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";

function Smoke() {
  const shaderRef = useRef();
  const geomertyRef = useRef();
  const { viewport } = useThree();

  const smokeTexture = useTexture("/image/perlin.png");
  // console.log(smokeTexture);

  //Repeat texture during animation
  smokeTexture.wrapS = THREE.RepeatWrapping;
  smokeTexture.wrapT = THREE.RepeatWrapping;
  console.log(smokeTexture);
  const uniforms = useRef({
    uTime: new THREE.Uniform(0),
    uResolution: new THREE.Uniform(
      new THREE.Vector2(1, viewport.height / viewport.width)
    ),
    uSmokeTexture: new THREE.Uniform(smokeTexture),
  });
  useFrame((state, delta) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value += delta * 0.4;
      shaderRef.current.uniforms.uResolution.value = new THREE.Vector2(
        1,
        viewport.height / viewport.width
      );
    }
  });

  return (
    <mesh scale={[16, 1, 1]}>
      <planeGeometry ref={geomertyRef} args={[1, 1, 32, 16]} />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={smokeVertexShader}
        fragmentShader={smokeFragmentShader}
        uniforms={uniforms.current}
        side={THREE.DoubleSide}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}

export default Smoke;
