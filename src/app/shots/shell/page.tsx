import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Shell from "./Shell";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Shell />
    </ShotPageLayout>
  );
}
