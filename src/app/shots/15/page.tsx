import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental15 from "./Experimental15";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental15 />
    </ShotPageLayout>
  );
}
