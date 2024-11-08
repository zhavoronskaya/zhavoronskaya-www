import React from "react";
import BaseCanvas from "@/theme/components/BaseCanvas";
import Logo from "./Logo";

export default function ZhavoronskayaPlaneVertical() {
  return (
    <BaseCanvas orthographic className="" withActions={false}>
      {/* className="opacity-30" */}
      <color args={["#efd4f7"]} attach="background" />

      <React.Suspense fallback={null}>
        <Logo idx={1} />
      </React.Suspense>
    </BaseCanvas>
  );
}
