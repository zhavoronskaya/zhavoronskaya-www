import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental28 from "./Experimental28";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental28 />
    </ShotPageLayout>
  );
}
