import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental43 from "./Experimental43";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental43 />
    </ShotPageLayout>
  );
}
