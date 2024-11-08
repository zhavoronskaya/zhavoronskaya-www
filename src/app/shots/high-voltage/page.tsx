import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import HighVoltage from "./HighVoltage";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <HighVoltage />
    </ShotPageLayout>
  );
}
