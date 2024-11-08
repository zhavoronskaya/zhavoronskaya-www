import { Suspense } from "react";
import { Html, OrbitControls, useProgress } from "@react-three/drei";
import Transparent from "./Transparent";

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
      <color args={["#010e17"]} attach="background" />
      <ambientLight intensity={1.0} color={"#d0edf2"} />
      <OrbitControls
        makeDefault
        minDistance={3}
        screenSpacePanning={false}
        maxDistance={20}
        zoomSpeed={1}
        // enablePan={false}
        enableDamping
      />
      <Suspense fallback={<Loader />}>
        <Transparent />
      </Suspense>
    </>
  );
}
