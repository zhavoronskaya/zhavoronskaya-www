"use client";
import BaseCanvas from "@/theme/components/BaseCanvas";
import Experience from "./Experience";
import { Leva, folder, useControls } from "leva";
export default function Background() {
  return (
    <>
      <Leva collapsed />
      <BaseCanvas
        dpr={[1, 2]}
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
          position: [7, 12, 10],
        }}
      >
        <Experience />
      </BaseCanvas>
    </>
  );
}
