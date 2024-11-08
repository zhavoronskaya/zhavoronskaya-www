"use client";
import BaseCanvas from "@/theme/components/BaseCanvas";
import Experience from "./Experience";

export default function Background() {
  return (
    <BaseCanvas
      dpr={1}
      camera={{
        fov: 45,
        near: 0.1,
        far: 100,
        position: [0, 0, 6],
      }}
    >
      <Experience />
    </BaseCanvas>
  );
}
