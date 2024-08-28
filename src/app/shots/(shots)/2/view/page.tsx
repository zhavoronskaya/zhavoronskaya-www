"use client";
import ViewShotPageLayout from "@/modules/shots/components/ViewShotPageLayout";
import Experience from "./RayMarching2/Experience";

export default function Shot() {
  return (
    <ViewShotPageLayout
      dpr={[1, 2]}
      orthographic
      withActions={true}
      hrefBackArrow="/shots/"
    >
      <Experience />
    </ViewShotPageLayout>
  );
}
