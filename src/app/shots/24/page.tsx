import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental24 from "./Experimental24";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental24 />
    </ShotPageLayout>
  );
}
