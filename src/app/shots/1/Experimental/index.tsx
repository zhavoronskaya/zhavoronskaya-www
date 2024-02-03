"use client";
import BaseCanvas from "@/theme/components/BaseCanvas";
import Experience from "./Experience";

export default function Background() {
  return (
    <BaseCanvas dpr={[1, 2]} orthographic>
      <Experience />
    </BaseCanvas>
  );
}
