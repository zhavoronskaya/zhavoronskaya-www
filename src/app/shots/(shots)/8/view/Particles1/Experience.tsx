import { Suspense } from "react";

import Particles from "./Particles";
import { OrbitControls } from "@react-three/drei";

export default function Experience() {
  return (
    <>
      <color args={["#0e0e2e"]} attach="background" />
      <OrbitControls
        makeDefault
        minDistance={3}
        screenSpacePanning={false}
        maxDistance={50}
        zoomSpeed={1}
        // enablePan={false}
        enableDamping
      />
      <Suspense fallback={null}>
        <Particles />
      </Suspense>
    </>
  );
}
