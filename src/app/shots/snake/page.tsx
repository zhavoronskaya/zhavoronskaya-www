import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Snake from "./Snake";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Snake />
    </ShotPageLayout>
  );
}
