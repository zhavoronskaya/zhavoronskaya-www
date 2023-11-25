import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import MirrorSphere from "./MirrorSphere";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <MirrorSphere />
    </ShotPageLayout>
  );
}
