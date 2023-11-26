import React from "react";
import BaseCanvas from "@/theme/components/BaseCanvas";
import Logo from "./Logo";

export default function ZhavoronskayaPlaneVertical() {
  return (
    <BaseCanvas orthographic className="opacity-30" withActions={false}>
      <color args={["#FAEBFF"]} attach="background" />

      <React.Suspense fallback={null}>
        <Logo idx={1} />
      </React.Suspense>
    </BaseCanvas>
  );
}
