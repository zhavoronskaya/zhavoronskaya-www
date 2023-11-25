import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import PinkEllipses from "./PinkEllipses";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <PinkEllipses />
    </ShotPageLayout>
  );
}
