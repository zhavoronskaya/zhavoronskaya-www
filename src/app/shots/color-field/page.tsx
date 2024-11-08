import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import ColorField from "./ColorField";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <ColorField />
    </ShotPageLayout>
  );
}
