"use client";
import BaseCanvas from "@/theme/components/BaseCanvas";
import Experience from "./Experience.js";

export default function Scene() {
  return (
    <>
      <BaseCanvas
        shadows
        dpr={[1, 2]}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [0, 4, 8],
        }}
      >
        <Experience />
      </BaseCanvas>

      {/* <div style={{ position: "absolute", top: 0 }}>
        <h2>Hello</h2>
        <input type="file" placeholder="Upload!" />
      </div> */}
    </>
  );
}
