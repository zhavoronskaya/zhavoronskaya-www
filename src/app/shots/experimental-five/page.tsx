import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import ExperimentalFive from "./ExperimentalFive";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <ExperimentalFive />
    </ShotPageLayout>
  );
}
