import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Sea from "./Sea";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Sea />
    </ShotPageLayout>
  );
}
