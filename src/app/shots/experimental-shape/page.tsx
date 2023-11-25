import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import ExperimentalShape from "./ExperimentalShape";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <ExperimentalShape />
    </ShotPageLayout>
  );
}
