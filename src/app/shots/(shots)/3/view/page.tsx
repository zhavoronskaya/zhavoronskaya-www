"use client";
import ViewShotPageLayout from "@/modules/shots/components/ViewShotPageLayout";
import Experience from "./Geometry1/Experience";

export default function Shot() {
  return (
    <ViewShotPageLayout
      // frameloop="demand"
      dpr={[1, 2]}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [4.72, 7.06, 6.06],
      }}
      withActions={true}
      hrefBackArrow="/shots/3"
    >
      <Experience />
    </ViewShotPageLayout>
  );
}
