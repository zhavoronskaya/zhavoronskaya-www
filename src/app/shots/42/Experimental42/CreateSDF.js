import { useRef, useEffect } from "react";
import React from "react";

import sdfVertexShader from "./shaders/sdf/vertex.js";
import sdfFragmentShader from "./shaders/sdf/fragment.js";

import { useThree, useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";

function CreateSDF() {
  const shaderRef = useRef();
  const geomertyRef = useRef();
  const mesh = useRef();
  const gl = useThree();

  const uniforms = useRef({
    uTime: new THREE.Uniform(0),
    uResolution: new THREE.Uniform(
      new THREE.Vector2(gl.size.width, gl.size.height).multiplyScalar(
        gl.viewport.dpr
      )
    ),
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
      <planeGeometry
        ref={geomertyRef}
        args={[
          uniforms.current.uResolution.x,
          uniforms.current.uResolution.y,
          32,
          16,
        ]}
      />
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
