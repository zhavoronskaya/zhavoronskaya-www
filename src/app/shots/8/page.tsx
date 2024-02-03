import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental8 from "./Experimental8";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental8 />
    </ShotPageLayout>
  );
}
