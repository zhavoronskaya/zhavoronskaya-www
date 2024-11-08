import { Suspense } from "react";
import { Html, OrbitControls, useProgress } from "@react-three/drei";
import FBO from "./FBO";

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return (
    <Html
      center
      style={{ color: "rgba(248, 244, 244, 1)", fontFamily: "Satoshi" }}
    >
      Loading...
    </Html>
  );
}

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
      <Suspense fallback={<Loader />}>
        <FBO />
      </Suspense>
    </>
  );
}
