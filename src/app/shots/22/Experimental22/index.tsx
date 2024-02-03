"use client";
import BaseCanvas from "@/theme/components/BaseCanvas";
import Experience from "./Experience.js";

export default function Scene() {
  return (
    <BaseCanvas
      dpr={[1, 2]}
      camera={{
        fov: 45,
        near: 0.001,
        far: 800,
        position: [1.6, 0.5, 0.5],
      }}
    >
      <Experience />
    </BaseCanvas>
  );
}
