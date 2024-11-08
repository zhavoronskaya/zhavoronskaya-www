import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental4 from "./Experimental4";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental4 />
    </ShotPageLayout>
  );
}
