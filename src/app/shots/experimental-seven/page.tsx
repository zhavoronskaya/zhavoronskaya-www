import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import ExperimentalSeven from "./ExperimentalSeven";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <ExperimentalSeven />
    </ShotPageLayout>
  );
}
