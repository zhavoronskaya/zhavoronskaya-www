import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental33 from "./Experimental33";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental33 />
    </ShotPageLayout>
  );
}
