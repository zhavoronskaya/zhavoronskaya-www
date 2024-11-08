import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Cameo from "./Cameo";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Cameo />
    </ShotPageLayout>
  );
}
