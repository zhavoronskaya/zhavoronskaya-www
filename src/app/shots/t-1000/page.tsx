import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import SpaceShip from "./SpaceShip";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <SpaceShip />
    </ShotPageLayout>
  );
}
