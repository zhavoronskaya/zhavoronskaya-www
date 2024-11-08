import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Distortion from "./Distortion";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Distortion />
    </ShotPageLayout>
  );
}
