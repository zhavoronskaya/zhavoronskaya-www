"use client";
import ViewShotPageLayout from "@/modules/shots/components/ViewShotPageLayout";
import Experience from "./Transparent1/Experience";

export default function Shot() {
  return (
    <ViewShotPageLayout
      // frameloop="demand"
      dpr={[1, 2]}
      camera={{
        fov: 45,
        near: 0.5,
        far: 800,
        position: [-36.67, 15.54, -10.36],
      }}
      withActions={true}
      hrefBackArrow="/shots"
    >
      <Experience />
    </ViewShotPageLayout>
  );
}
