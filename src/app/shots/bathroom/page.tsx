import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import BathRoom from "./BathRoom";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <BathRoom />
    </ShotPageLayout>
  );
}
