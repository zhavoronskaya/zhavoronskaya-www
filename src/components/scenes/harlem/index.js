import React, { useState, useEffect } from "react";
import Canvas from "@/components/theme/Canvas";
import Experience from "./Experience.js";

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [0, 0, 24],
      }}
    >
      <Experience />
    </Canvas>
  );
}
