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
        far: 200,
        position: [0, 26, 0],
      }}
    >
      <Experience />
    </BaseCanvas>
  );
}
