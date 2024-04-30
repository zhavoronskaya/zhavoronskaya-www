import { useRef, useEffect } from "react";
import React from "react";

import sdfVertexShader from "./shaders/sdf/vertex.js";
import sdfFragmentShader from "./shaders/sdf/fragment.js";

import { useThree, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

function CreateSDF() {
  const shaderRef = useRef();
  const geomertyRef = useRef();
  const mesh = useRef();
  const gl = useThree();
  const texture = useTexture("/image/noise1.png");
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;

  const smokeTexture = useTexture("/image/perlin.png");
  smokeTexture.wrapS = THREE.RepeatWrapping;
  smokeTexture.wrapT = THREE.RepeatWrapping;
  // smokeTexture.minFilter = THREE.NearestFilter;
  // smokeTexture.magFilter = THREE.NearestFilter;

  const uniforms = useRef({
    uTime: new THREE.Uniform(0),
    uResolution: new THREE.Uniform(
      new THREE.Vector2(gl.size.width, gl.size.height).multiplyScalar(
        gl.viewport.dpr
      )
    ),
    uTexture: new THREE.Uniform(texture),
    uSmokeTex: new THREE.Uniform(smokeTexture),
  });

  //Resize
  useEffect(() => {
    mesh.current.material.uniforms.uResolution.value = new THREE.Vector2(
      gl.size.width,
      gl.size.height
    ).multiplyScalar(gl.viewport.dpr);
  }, [gl.size.width, gl.size.height]);

  useFrame((state, delta) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value += delta * 0.4;
    }
  });

  return (
    <mesh ref={mesh} scale={[gl.viewport.width, gl.viewport.height, 1]}>
      <planeGeometry ref={geomertyRef} args={[1, 1, 32, 16]} />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={sdfVertexShader}
        fragmentShader={sdfFragmentShader}
        uniforms={uniforms.current}
        side={THREE.DoubleSide}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}

export default CreateSDF;
