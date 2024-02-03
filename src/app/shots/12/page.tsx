import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental12 from "./Experimental12";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental12 />
    </ShotPageLayout>
  );
}
