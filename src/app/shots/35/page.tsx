import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental35 from "./Experimental35";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental35 />
    </ShotPageLayout>
  );
}
