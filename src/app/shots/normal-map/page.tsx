import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import NormalMap from "./NormalMap";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <NormalMap />
    </ShotPageLayout>
  );
}
