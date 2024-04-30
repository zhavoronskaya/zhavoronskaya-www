import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental41 from "./Experimental41";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental41 />
    </ShotPageLayout>
  );
}
