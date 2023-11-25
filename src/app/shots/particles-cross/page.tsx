import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import ParticlesSound from "./ParticlesSound";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <ParticlesSound />
    </ShotPageLayout>
  );
}
