import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import BloodySky from "./BloodySky";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <BloodySky />
    </ShotPageLayout>
  );
}
