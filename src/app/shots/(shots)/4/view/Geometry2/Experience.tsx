import { Suspense } from "react";
import {
  ToneMapping,
  EffectComposer,
  Noise,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { OrbitControls } from "@react-three/drei";
import Geometry from "./Geometry";

export default function Experience() {
  return (
    <>
      <EffectComposer multisampling={0}>
        {/* <ToneMapping mode={ToneMappingMode.ACES_FILMIC} /> */}
        <Noise opacity={0.01} />
      </EffectComposer>
      <color args={["#a7a4b0"]} attach="background" />
      <OrbitControls
        makeDefault
        minDistance={3}
        screenSpacePanning={false}
        maxDistance={20}
        zoomSpeed={1}
        // enablePan={false}
        enableDamping
      />
      <Suspense fallback={null}>
        <Geometry />
      </Suspense>
    </>
  );
}
