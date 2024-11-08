import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental19 from "./Experimental19";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental19 />
    </ShotPageLayout>
  );
}
