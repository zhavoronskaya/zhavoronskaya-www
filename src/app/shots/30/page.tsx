import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental30 from "./Experimental30";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental30 />
    </ShotPageLayout>
  );
}
