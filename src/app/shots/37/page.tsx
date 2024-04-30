import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental37 from "./Experimental37";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental37 />
    </ShotPageLayout>
  );
}
