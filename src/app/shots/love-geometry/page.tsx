import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import LoveGeometry from "./LoveGeometry";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <LoveGeometry />
    </ShotPageLayout>
  );
}
