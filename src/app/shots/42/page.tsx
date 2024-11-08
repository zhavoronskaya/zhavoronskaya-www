import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental42 from "./Experimental42";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental42 />
    </ShotPageLayout>
  );
}
