"use client";
import ViewShotPageLayout from "@/modules/shots/components/ViewShotPageLayout";
import Experience from "./Particles2/Experience";
import { Loader } from "@react-three/drei";

export default function Shot() {
  return (
    <>
      <ViewShotPageLayout
        dpr={[1, 2]}
        camera={{
          fov: 45,
          near: 0.5,
          far: 800,
          position: [0, 0, 20],
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
