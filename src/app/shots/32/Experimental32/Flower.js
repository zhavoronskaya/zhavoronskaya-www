import { useFBO, useGLTF } from "@react-three/drei";

import { extend, useFrame, useThree, createPortal } from "@react-three/fiber";
import { Suspense, useRef, useEffect } from "react";
import * as THREE from "three";
import React from "react";
import pointsVertexShader from "./shaders/vertex.js";
import pointsFragmentShader from "./shaders/fragment.js";
import simulationVertexShader from "./shaders/simulationVertex.js";
import simulationFragmentShaderFlower from "./shaders/simulationFragmentFlower.js";

function makeTexture(g) {
  console.log("g", g);
  let vertAmount = g.attributes.position.count;
  let texWidth = Math.ceil(Math.sqrt(vertAmount));
  let texHeight = Math.ceil(vertAmount / texWidth);

  let data = new Float32Array(texWidth * texHeight * 4);

  // function shuffleArrayByThree(array) {
  //   const groupLength = 3;

  //   let numGroups = Math.floor(array.length / groupLength);

  //   for (let i = numGroups - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));

  //     for (let k = 0; k < groupLength; k++) {
  //       let temp = array[i * groupLength + k];
  //       array[i * groupLength + k] = array[j * groupLength + k];
  //       array[j * groupLength + k] = temp;
  //     }
  //   }

  //   return array;
  // }

  // shuffleArrayByThree(g.attributes.position.array);

  for (let i = 0; i < vertAmount; i++) {
    const x = g.attributes.position.array[i * 3 + 0];
    const y = g.attributes.position.array[i * 3 + 1];
    const z = g.attributes.position.array[i * 3 + 2];
    const w = 0;

    data[i * 4 + 0] = x;
    data[i * 4 + 1] = y;
    data[i * 4 + 2] = z;
    data[i * 4 + 3] = w;
  }

  let dataTexture = new THREE.DataTexture(
    data,
    texWidth,
    texHeight,
    THREE.RGBAFormat,
    THREE.FloatType
  );
  dataTexture.needsUpdate = true;

  return dataTexture;
}

const SIZE = 800;

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(
  -1,
  1,
  1,
  -1,
  1 / Math.pow(2, 53),
  1
);
const positions = new Float32Array([
  -1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0,
]);
const uvs = new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]);

const FBOParticlesFLower = () => {
  const points = useRef();
  const simulationMaterialRef = useRef();

  const cotton = useGLTF("../../model/cotton.glb");
  console.log(cotton);

  const renderTarget = useFBO(SIZE, SIZE, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    stencilBuffer: false,
    type: THREE.FloatType,
  });
  const renderTargetCopy = renderTarget.clone();

  // Generate our positions attributes array
  const particlesPosition = React.useMemo(() => {
    const length = SIZE * SIZE;
    const particles = new Float32Array(length * 3);
    for (let i = 0; i < length; i++) {
      let i3 = i * 3;
      particles[i3 + 0] = (i % SIZE) / SIZE;
      particles[i3 + 1] = i / SIZE / SIZE;
    }
    return particles;
  }, []);

  const uniforms = React.useRef({
    uPositions: { value: null },
    uTime: { value: 0 },
  });

  const simUniforms = React.useRef({
    positions: { value: makeTexture(cotton.scene.children[0].geometry) },
    uFrequency: { value: 0.9 },
    uTime: { value: 0 },
  });

  useFrame((state, delta) => {
    const { gl, clock } = state;

    gl.setRenderTarget(renderTarget);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    points.current.material.uniforms.uPositions.value = renderTarget.texture;
    // points.current.material.uniforms.uTime.value += delta * 0.5;
    simulationMaterialRef.current.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <>
      {createPortal(
        <mesh>
          <shaderMaterial
            ref={simulationMaterialRef}
            fragmentShader={simulationFragmentShaderFlower}
            vertexShader={simulationVertexShader}
            uniforms={simUniforms.current}
          />
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={positions.length / 3}
              array={positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-uv"
              count={uvs.length / 2}
              array={uvs}
              itemSize={2}
            />
          </bufferGeometry>
        </mesh>,
        scene
      )}

      <points ref={points} transparent={true}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <shaderMaterial
          blending={THREE.AdditiveBlending}
          transparent={true}
          vertexColors
          depthWrite={false}
          fragmentShader={pointsFragmentShader}
          vertexShader={pointsVertexShader}
          uniforms={uniforms.current}
        />
      </points>
    </>
  );
};

export default FBOParticlesFLower;
