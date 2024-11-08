import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Harlem from "./Harlem";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Harlem />
    </ShotPageLayout>
  );
}
