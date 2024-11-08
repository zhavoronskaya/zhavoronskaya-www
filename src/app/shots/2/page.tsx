import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental2 from "./Experimental2";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental2 />
    </ShotPageLayout>
  );
}
