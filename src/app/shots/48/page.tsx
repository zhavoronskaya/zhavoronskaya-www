import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental48 from "./Experimental48";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental48 />
    </ShotPageLayout>
  );
}
