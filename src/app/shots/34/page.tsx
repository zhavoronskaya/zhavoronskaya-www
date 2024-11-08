import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental34 from "./Experimental34";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental34 />
    </ShotPageLayout>
  );
}
