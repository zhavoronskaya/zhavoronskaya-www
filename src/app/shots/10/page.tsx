import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental10 from "./Experimental10";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental10 />
    </ShotPageLayout>
  );
}
