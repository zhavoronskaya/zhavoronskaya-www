import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import AlienFlower from "./AlienFlower";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <AlienFlower />
    </ShotPageLayout>
  );
}
