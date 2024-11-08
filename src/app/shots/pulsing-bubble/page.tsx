import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import PulsingBubble from "./PulsingBubble";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <PulsingBubble />
    </ShotPageLayout>
  );
}
