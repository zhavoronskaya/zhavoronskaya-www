import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import ParticlesTwist from "./ParticlesTwist";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <ParticlesTwist />
    </ShotPageLayout>
  );
}
