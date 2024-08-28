import { Suspense } from "react";
import { Html, useProgress } from "@react-three/drei";
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
      {/* <OrbitControls /> */}
      <color args={["#02191c"]} attach="background" />
      <Suspense fallback={<Loader />}>
        <Particles />
      </Suspense>
    </>
  );
}
