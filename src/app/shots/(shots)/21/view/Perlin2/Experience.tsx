import { Suspense } from "react";
import Pelin from "./Perlin";
import { OrbitControls } from "@react-three/drei";

export default function Experience() {
  return (
    <>
      <color args={["white"]} attach="background" />
      <OrbitControls
        makeDefault
        minDistance={1}
        screenSpacePanning={false}
        maxDistance={30}
        zoomSpeed={1}
        // enablePan={false}
        enableDamping
      />
      <Suspense fallback={null}>
        <Pelin />
      </Suspense>
    </>
  );
}
