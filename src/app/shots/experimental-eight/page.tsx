import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import ExperimentalEight from "./ExperimentalEight";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <ExperimentalEight />
    </ShotPageLayout>
  );
}
