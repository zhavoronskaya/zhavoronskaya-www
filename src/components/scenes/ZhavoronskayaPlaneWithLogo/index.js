"use client";
import React from "react";
import { EffectComposer } from "@react-three/postprocessing";

import Post from "./effects/Post.js";
import Logo from "./components/Logo";
import DecorativeText from "./components/DecorativeText";

import BaseCanvas from "@/theme/components/BaseCanvas";

export default function HeroScene() {
  return (
    <BaseCanvas
      withActions={false}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [0, 0, 15],
      }}
    >
      <EffectComposer>
        <Post />
      </EffectComposer>

      <color args={["#efd4f7"]} attach="background" />

      <ambientLight />

      <React.Suspense fallback={null}>
        <DecorativeText />
        <Logo />
      </React.Suspense>
    </BaseCanvas>
  );
}
