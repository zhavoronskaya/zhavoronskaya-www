import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental5 from "./Experimental5";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental5 />
    </ShotPageLayout>
  );
}
