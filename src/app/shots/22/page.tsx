import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import ExperimentalTwenty from "./Experimental22";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <ExperimentalTwenty />
    </ShotPageLayout>
  );
}
