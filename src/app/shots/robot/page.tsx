import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Robot from "./Robot";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Robot />
    </ShotPageLayout>
  );
}
