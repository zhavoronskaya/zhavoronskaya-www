import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental14 from "./Experimental14";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental14 />
    </ShotPageLayout>
  );
}
