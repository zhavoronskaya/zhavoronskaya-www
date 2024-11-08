import { Suspense } from "react";
import { Html, OrbitControls, useProgress } from "@react-three/drei";
import FBOBush from "./FBOBush";
import FBOFLower from "./FBOFlower";

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return (
    <Html center style={{ color: "rgba(11, 0, 20, 1)", fontFamily: "Satoshi" }}>
      Loading...
    </Html>
  );
}
export default function Experience() {
  return (
    <>
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
        <FBOBush />
        <FBOFLower />
      </Suspense>
    </>
  );
}
