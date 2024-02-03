import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental9 from "./Experimental9";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental9 />
    </ShotPageLayout>
  );
}
