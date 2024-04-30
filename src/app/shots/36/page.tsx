import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental36 from "./Experimental36";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental36 />
    </ShotPageLayout>
  );
}
