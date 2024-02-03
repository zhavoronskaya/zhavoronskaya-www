import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental17 from "./Experimental17";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental17 />
    </ShotPageLayout>
  );
}
