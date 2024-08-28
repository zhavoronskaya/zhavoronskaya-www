"use client";
import ViewShotPageLayout from "@/modules/shots/components/ViewShotPageLayout";
import Experience from "./FBO4/Experience";

export default function Shot() {
  return (
    <ViewShotPageLayout
      // frameloop="demand"
      dpr={[1, 2]}
      camera={{
        fov: 45,
        near: 0.1,
        far: 1000,
        position: [-6, 0, -4],
      }}
      withActions={true}
      hrefBackArrow="/shots"
    >
      <Experience />
    </ViewShotPageLayout>
  );
}
