import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import CameoSpiral from "./CameoSpiral";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <CameoSpiral />
    </ShotPageLayout>
  );
}
