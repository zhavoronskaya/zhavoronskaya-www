"use client";
import ViewShotPageLayout from "@/modules/shots/components/ViewShotPageLayout";
import Experience from "./Transparent2/Experience";

export default function Shot() {
  return (
    <ViewShotPageLayout
      // frameloop="demand"
      dpr={[1, 2]}
      camera={{
        fov: 45,
        near: 0.01,
        far: 800,
        position: [-0.07, 0.12, 1.5],
      }}
      withActions={true}
      hrefBackArrow="/shots/17"
    >
      <Experience />
    </ViewShotPageLayout>
  );
}
