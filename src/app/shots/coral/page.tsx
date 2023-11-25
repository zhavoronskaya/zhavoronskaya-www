import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Coral from "./Coral";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Coral />
    </ShotPageLayout>
  );
}
