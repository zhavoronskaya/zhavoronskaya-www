import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental20 from "./Experimental20";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental20 />
    </ShotPageLayout>
  );
}
