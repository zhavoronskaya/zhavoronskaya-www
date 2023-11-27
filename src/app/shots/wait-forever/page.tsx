import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import WaitForever from "./WaitForever";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <WaitForever />
    </ShotPageLayout>
  );
}
