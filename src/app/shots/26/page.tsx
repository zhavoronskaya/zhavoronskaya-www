import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental26 from "./Experimental26";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental26 />
    </ShotPageLayout>
  );
}
