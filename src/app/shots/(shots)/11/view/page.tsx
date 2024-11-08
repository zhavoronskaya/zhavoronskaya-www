"use client";
import ViewShotPageLayout from "@/modules/shots/components/ViewShotPageLayout";
import Experience from "./FBO1/Experience";

export default function Shot() {
  return (
    <ViewShotPageLayout
      // frameloop="demand"
      dpr={[1, 2]}
      camera={{
        fov: 45,
        near: 0.1,
        far: 1000,
        position: [0, 0, 3],
      }}
      withActions={true}
      hrefBackArrow="/shots/11"
    >
      <Experience />
    </ViewShotPageLayout>
  );
}
