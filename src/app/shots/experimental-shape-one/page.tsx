import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import ExperimentalShapeOne from "./ExperimentalShapeOne";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <ExperimentalShapeOne />
    </ShotPageLayout>
  );
}
