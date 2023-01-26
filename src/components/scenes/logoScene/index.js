import { Canvas } from "@react-three/fiber";
import styles from "./Canvas.module.css";
import Experience from "./Experience.js";
import React from "react";
import * as THREE from "three";
export default function Scene() {
  return (
    <Canvas
      className={styles.canvas}
      dpr={[1, 2]}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [0, 2, 13],
      }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        outputEncoding: THREE.sRGBEncoding,
        // magFilter: THREE.NearestFilter,
        // outputEncoding: THREE.LinearEncoding,
      }}
    >
      <Experience />
    </Canvas>
  );
}
