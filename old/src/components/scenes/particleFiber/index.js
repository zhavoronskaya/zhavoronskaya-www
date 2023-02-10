import { Canvas } from "@react-three/fiber";
import styles from "./Canvas.module.css";
import Experience from "./Experience.js";
import React from "react";

export default function Scene() {
  return (
    <Canvas
      className={styles.canvas}
      dpr={[1, 2]}
      camera={{
        fov: 45,
        near: 0.5,
        far: 800,
        position: [1.5, 4, 3.5],
      }}
    >
      <Experience />
    </Canvas>
  );
}
