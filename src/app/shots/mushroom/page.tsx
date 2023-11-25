import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Mushroom from "./Mushroom";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Mushroom />
    </ShotPageLayout>
  );
}
