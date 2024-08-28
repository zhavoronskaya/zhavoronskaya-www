"use client";
import ViewShotPageLayout from "@/modules/shots/components/ViewShotPageLayout";
import Experience from "./Geometry4/Experience";

export default function Shot() {
  return (
    <ViewShotPageLayout
      // frameloop="demand"
      dpr={[1, 2]}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [0, 0, 20],
      }}
      withActions={true}
      hrefBackArrow="/shots"
    >
      <Experience />
    </ViewShotPageLayout>
  );
}
