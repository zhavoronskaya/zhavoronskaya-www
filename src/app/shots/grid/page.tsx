import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Grid from "./Grid";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Grid />
    </ShotPageLayout>
  );
}
