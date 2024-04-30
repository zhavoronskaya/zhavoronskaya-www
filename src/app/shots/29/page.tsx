import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental29 from "./Experimental29";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental29 />
    </ShotPageLayout>
  );
}
