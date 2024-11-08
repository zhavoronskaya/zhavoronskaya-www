import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental44 from "./Experimental44";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental44 />
    </ShotPageLayout>
  );
}
