import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental6 from "./Experimental6";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental6 />
    </ShotPageLayout>
  );
}
