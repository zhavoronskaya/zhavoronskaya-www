import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental7 from "./Experimental7";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental7 />
    </ShotPageLayout>
  );
}
