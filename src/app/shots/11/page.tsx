import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental11 from "./Experimental11";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental11 />
    </ShotPageLayout>
  );
}
