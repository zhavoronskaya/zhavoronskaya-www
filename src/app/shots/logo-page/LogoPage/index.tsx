"use client";
import BaseCanvas from "@/theme/components/BaseCanvas";
import Experience from "./Experience.js";

export default function Scene() {
  return (
    // <div style={{ height: "70vh" }}>
    <BaseCanvas
      // dpr={[1, 2]}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [0, 0, 15],
      }}

      // camera={{ position: [0, 0, 1] }}
    >
      <Experience />
    </BaseCanvas>
    // </div>
  );
}
