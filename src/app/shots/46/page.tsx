import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental46 from "./Experimental46";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental46 />
    </ShotPageLayout>
  );
}
