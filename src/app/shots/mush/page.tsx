import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Mushrooms from "./Mushrooms";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Mushrooms />
    </ShotPageLayout>
  );
}
