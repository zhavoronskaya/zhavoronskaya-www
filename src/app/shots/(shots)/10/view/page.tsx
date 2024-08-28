"use client";
import ViewShotPageLayout from "@/modules/shots/components/ViewShotPageLayout";
import Experience from "./Particles3/Experience";
import { Loader } from "@react-three/drei";

export default function Shot() {
  return (
    <>
      <ViewShotPageLayout
        dpr={[1, 2]}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [12.96, 16.91, 24.63],
        }}
        withActions={true}
        hrefBackArrow="/shots"
      >
        <Experience />
      </ViewShotPageLayout>
      <Loader />
    </>
  );
}
