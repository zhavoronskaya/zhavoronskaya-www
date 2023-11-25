import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import ExperimentalShapeThree from "./ExperimentalShapeThree";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <ExperimentalShapeThree />
    </ShotPageLayout>
  );
}
