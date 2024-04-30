import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental45 from "./Experimental45";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental45 />
    </ShotPageLayout>
  );
}
