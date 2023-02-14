import { Canvas } from "@react-three/fiber";
import styles from "./Canvas.module.css";
import Experience from "./Experience.js";
import React from "react";

export default function Scene() {
  return (
    <Canvas className={styles.canvas} dpr={[1, 2]} orthographic>
      <Experience />
    </Canvas>
  );
}
