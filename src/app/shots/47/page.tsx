import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental47 from "./Experimental47";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental47 />
    </ShotPageLayout>
  );
}
