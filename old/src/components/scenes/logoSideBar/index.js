import { Canvas } from "@react-three/fiber";
import styles from "./Canvas.module.css";
import Experience from "./Experience.js";
import React from "react";

export default function Scene() {
  return (
    <Canvas
      className={styles.canvas}
      // dpr={[1, 2]}
      // camera={{
      //   fov: 45,
      //   near: 0.1,
      //   far: 200,
      //   position: [0, 0, 12],
      // }}
      orthographic
      // camera={{ position: [0, 0, 1] }}
    >
      <Experience />
    </Canvas>
  );
}
