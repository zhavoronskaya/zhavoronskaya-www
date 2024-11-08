import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import AlienObject from "./AlienObject";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <AlienObject />
    </ShotPageLayout>
  );
}
