import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import ExperimentalSix from "./ExperimentalSix";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <ExperimentalSix />
    </ShotPageLayout>
  );
}
