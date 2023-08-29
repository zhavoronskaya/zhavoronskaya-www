"use client";
import { Canvas } from "@react-three/fiber";
import styles from "./Canvas.module.css";
import Experience from "./Experience.js";
import React, { useState, useEffect } from "react";

export default function Scene() {
  return (
    <>
      <Canvas
        shadows
        className={styles.canvas}
        dpr={[1, 2]}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [0, 4, 8],
        }}
      >
        <Experience />
      </Canvas>

      {/* <div style={{ position: "absolute", top: 0 }}>
        <h2>Hello</h2>
        <input type="file" placeholder="Upload!" />
      </div> */}
    </>
  );
}
