import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Mold from "./Mold";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Mold />
    </ShotPageLayout>
  );
}
