import mirrorVertexShader from "../shaders/mirrorVertex.js";
import mirrorFragmentShader from "../shaders/mirrorFragment.js";
import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

import { extend } from "@react-three/fiber";
import { shaderMaterial, useTexture } from "@react-three/drei";

const MirrorMaterial = shaderMaterial(
  {
    uTime: 0,
    uTex: new THREE.Texture(),
  },
  mirrorVertexShader,
  mirrorFragmentShader
);
extend({ MirrorMaterial });

export default function Mirror() {
  const textMirror = useTexture("../../image/meduza.jpeg");
  textMirror.encoding = THREE.sRGBEncoding;
  const geomertyRef = useRef();
  // const { width, height } = useThree((state) => state.size);
  //   const {camera} = useThree((state) => state.camera);

  useEffect(() => {
    mirror.current.uTex = textMirror;
  }, []);
  const mirror = useRef();
  useFrame((state, delta) => {
    mirror.current.uTime += 0.5 * delta;
  });

  return (
    <mesh position={[1, 5.6, 8.9]} rotation-y={Math.PI} scale={22}>
      <planeGeometry args={[1, 1, 128, 128]} />
      <mirrorMaterial ref={mirror} />
    </mesh>
  );
}
