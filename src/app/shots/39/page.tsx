import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental39 from "./Experimental39";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental39 />
    </ShotPageLayout>
  );
}
