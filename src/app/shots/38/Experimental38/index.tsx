"use client";
import React from "react";
import BaseCanvas from "@/theme/components/BaseCanvas";
import Experience from "./Experience.js";

export default function Scene() {
  const [isMouseMoved, setIsMouseMoved] = React.useState(false);

  return (
    <BaseCanvas
      onPointerMove={isMouseMoved ? undefined : () => setIsMouseMoved(true)}
      dpr={[1, 2]}
      camera={{
        fov: 45,
        near: 1,
        far: 50000,
        position: [0, 0, 20],
      }}
    >
      <Experience isMouseMoved={isMouseMoved} />
    </BaseCanvas>
  );
}
