import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental13 from "./Experimental13";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental13 />
    </ShotPageLayout>
  );
}
