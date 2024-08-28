import { Suspense } from "react";
import { Html, useProgress } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model";
import Particles from "./Particles";

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
      <OrbitControls
        makeDefault
        minDistance={6}
        screenSpacePanning={false}
        maxDistance={40}
        zoomSpeed={1}
        maxPolarAngle={Math.PI * 0.38}
        minPolarAngle={0}
        // enablePan={false}
        enableDamping
      />
      <color args={["#3b2927"]} attach="background" />
      <ambientLight intensity={1.5} color={"white"} />
      <Suspense fallback={<Loader />}>
        <Particles />
        <Model />
      </Suspense>
    </>
  );
}
