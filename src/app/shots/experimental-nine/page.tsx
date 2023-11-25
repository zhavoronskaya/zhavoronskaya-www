import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import ExperimentalNine from "./ExperimentalNine";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <ExperimentalNine />
    </ShotPageLayout>
  );
}
