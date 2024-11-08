"use client";
import BaseCanvas from "@/theme/components/BaseCanvas";
import Experience from "./Experience";

export default function Background() {
  return (
    <BaseCanvas
      dpr={[1, 2]}
      camera={{
        fov: 45,
        near: 0.1,
        far: 1000,
        position: [7, 0, 8],
      }}
    >
      <Experience />
    </BaseCanvas>
  );
}
