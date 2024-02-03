import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental27 from "./Experimental27";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental27 />
    </ShotPageLayout>
  );
}
