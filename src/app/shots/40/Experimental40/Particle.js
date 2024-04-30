import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useEffect, useState, use } from "react";
import * as THREE from "three";

import pointsVertexShader from "./shaders/points/vertex.js";
import pointsFragmentShader from "./shaders/points/fragment.js";
import { useTexture } from "@react-three/drei";

import gsap from "gsap";

function setData(count, radius) {
  const positionsArray = new Float32Array(count * 3);
  const sizesArray = new Float32Array(count);
  const timeMultiplierArray = new Float32Array(count);

  for (let i = 0; i < count * 3; i++) {
    const i3 = i * 3;

    // positionsArray[i3] = Math.random() - 0.5;
    // positionsArray[i3 + 1] = Math.random() - 0.5;
    // positionsArray[i3 + 2] = Math.random() - 0.5;

    //Spherical destribution for sphere with radius thinkness 0.6-1.0
    const spherical = new THREE.Spherical(
      radius * (0.6 + 0.4 * Math.random()),
      Math.random() * Math.PI,
      Math.random() * 2 * Math.PI
    );
    const position = new THREE.Vector3();
    position.setFromSpherical(spherical);

    positionsArray[i3] = position.x;
    positionsArray[i3 + 1] = position.y;
    positionsArray[i3 + 2] = position.z;

    sizesArray[i] = Math.random();
    timeMultiplierArray[i] = Math.random() + 1.0;
  }
  return { positionsArray, sizesArray, timeMultiplierArray };
}

function Particles({ id, count, radius, position, onDestroy }) {
  const gl = useThree();

  const texture1 = useTexture("/image/1.png");
  const texture2 = useTexture("/image/2.png");

  const [data] = useState(() => setData(count, radius));
  // const [isVisible, setIsVisible] = useState(true);

  const uniforms = useRef({
    uSize: new THREE.Uniform(0.8),
    uResolution: new THREE.Uniform(
      new THREE.Vector2(gl.size.width, gl.size.height).multiplyScalar(
        gl.viewport.dpr
      )
    ),
    uTexture: new THREE.Uniform(texture1),
    uProgress: new THREE.Uniform(0),
  });

  useEffect(() => {
    const scene = document.getElementById("scene-40");
    if (!scene) return;

    const destroy = () => {
      console.log("destroy");
      onDestroy(id);
    };

    gsap.to(uniforms.current.uProgress, {
      value: 1,
      duration: 3,
      ease: "linear",
      onComplete: destroy,
    });

    // scene.addEventListener("click", onClick);
    // return () => {
    //   scene.removeEventListener("click", onClick);
    // };
  }, [id]);

  useEffect(() => {
    uniforms.current.uResolution.value = new THREE.Vector2(
      gl.size.width,
      gl.size.height
    ).multiplyScalar(gl.viewport.dpr);
  }, [gl.size.width, gl.size.height]);

  useFrame((state, delta) => {
    // uniforms.current.uResolution.value = new THREE.Vector2(
    //   state.size.width,
    //   state.size.height
    // );
  });

  // if (!isVisible) return null;

  return (
    <points position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={data.positionsArray}
          count={data.positionsArray.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aSize"
          array={data.sizesArray}
          count={data.sizesArray.length}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aTimeMultiplier"
          array={data.timeMultiplierArray}
          count={data.timeMultiplierArray.length}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={pointsVertexShader}
        fragmentShader={pointsFragmentShader}
        uniforms={uniforms.current}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default Particles;
