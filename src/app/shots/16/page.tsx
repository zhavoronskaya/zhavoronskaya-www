import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental16 from "./Experimental16";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental16 />
    </ShotPageLayout>
  );
}
