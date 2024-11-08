import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental32 from "./Experimental32";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental32 />
    </ShotPageLayout>
  );
}
