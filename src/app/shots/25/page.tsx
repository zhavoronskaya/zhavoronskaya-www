import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental25 from "./Experimental25";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental25 />
    </ShotPageLayout>
  );
}
