import React from "react";
import BaseCanvas from "@/theme/components/BaseCanvas";
import Logo from "./Logo";

export default function LogoSideBarScene() {
  return (
    <BaseCanvas orthographic refreshTriggerId="-1">
      <color args={["#F3CBFE"]} attach="background" />

      <React.Suspense fallback={null}>
        <Logo />
      </React.Suspense>
    </BaseCanvas>
  );
}
