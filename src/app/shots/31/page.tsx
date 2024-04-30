import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental31 from "./Experimental31";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental31 />
    </ShotPageLayout>
  );
}
