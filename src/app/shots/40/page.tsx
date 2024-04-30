import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental40 from "./Experimental40";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental40 />
    </ShotPageLayout>
  );
}
