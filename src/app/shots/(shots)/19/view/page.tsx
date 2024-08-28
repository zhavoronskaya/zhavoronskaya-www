"use client";
import ViewShotPageLayout from "@/modules/shots/components/ViewShotPageLayout";
import Experience from "./Transparent4/Experience";

export default function Shot() {
  return (
    <ViewShotPageLayout
      // frameloop="demand"
      dpr={[1, 2]}
      camera={{
        fov: 45,
        near: 0.1,
        far: 1000,
        position: [7, 18, 10],
      }}
      withActions={true}
      hrefBackArrow="/shots"
    >
      <Experience />
    </ViewShotPageLayout>
  );
}
