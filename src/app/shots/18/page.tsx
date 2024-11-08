import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental18 from "./Experimental18";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental18 />
    </ShotPageLayout>
  );
}
