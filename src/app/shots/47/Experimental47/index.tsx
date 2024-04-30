"use client";
import BaseCanvas from "@/theme/components/BaseCanvas";
import Experience from "./Experience";
import { useRef, useState } from "react";

export default function Background() {
  return (
    <BaseCanvas
      id="scene-47"
      dpr={[1, 2]}
      camera={{
        fov: 45,
        near: 0.1,
        far: 1000,
        position: [-18, 0, 7],
      }}
    >
      <Experience />
    </BaseCanvas>
  );
}
