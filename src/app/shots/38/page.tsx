import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental38 from "./Experimental38";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental38 />
    </ShotPageLayout>
  );
}
