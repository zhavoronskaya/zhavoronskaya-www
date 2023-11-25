"use client";
import BaseCanvas from "@/theme/components/BaseCanvas";
import Experience from "./Experience.js";

export default function Scene() {
  return (
    <BaseCanvas dpr={[1, 2]} orthographic>
      <Experience />
    </BaseCanvas>
  );
}
