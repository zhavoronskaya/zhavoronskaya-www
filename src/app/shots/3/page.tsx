import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental3 from "./Experimental3";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental3 />
    </ShotPageLayout>
  );
}
