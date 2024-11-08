import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental21 from "./Experimental21";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental21 />
    </ShotPageLayout>
  );
}
