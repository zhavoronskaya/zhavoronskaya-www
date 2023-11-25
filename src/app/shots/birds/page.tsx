import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Birds from "./Birds";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Birds />
    </ShotPageLayout>
  );
}
