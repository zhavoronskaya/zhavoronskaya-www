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
      <color args={["#0a0000"]} attach="background" />
      <ambientLight intensity={4.0} color={"#fff"} />
      <OrbitControls
        makeDefault
        minDistance={30}
        screenSpacePanning={false}
        maxDistance={120}
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
