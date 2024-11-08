"use client";
import ViewShotPageLayout from "@/modules/shots/components/ViewShotPageLayout";
import Experience from "./Particles1/Experience";

export default function Shot() {
  return (
    <ViewShotPageLayout
      dpr={[1, 2]}
      camera={{
        fov: 45,
        near: 0.5,
        far: 800,
        position: [9.3, 6.07, -16.62],
      }}
      withActions={true}
      hrefBackArrow="/shots/8"
    >
      <Experience />
    </ViewShotPageLayout>
  );
}
