"use client";
import BaseCanvas from "@/theme/components/BaseCanvas";
import Experience from "./Experience.js";

export default function Scene() {
  return (
    <BaseCanvas
      dpr={[1, 2]}
      camera={{
        fov: 45,
        near: 1,
        far: 50000,
        position: [0, 0, 500],
      }}
    >
      <Experience />
    </BaseCanvas>
  );
}
