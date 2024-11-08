import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import PsyPlane from "./PsyPlane";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <PsyPlane />
    </ShotPageLayout>
  );
}
