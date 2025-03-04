import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import FBO from "./FBO";

export default function Experience() {
  return (
    <>
      <color args={["#070c1c"]} attach="background" />
      <OrbitControls
        makeDefault
        minDistance={1}
        screenSpacePanning={false}
        maxDistance={40}
        zoomSpeed={1}
        // enablePan={false}
        enableDamping
      />
      <Suspense fallback={null}>
        <FBO />
      </Suspense>
    </>
  );
}
