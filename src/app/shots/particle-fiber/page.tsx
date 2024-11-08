import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import ParticleFiber from "./ParticleFiber";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <ParticleFiber />
    </ShotPageLayout>
  );
}
