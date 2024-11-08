import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental23 from "./Experimental23";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental23 />
    </ShotPageLayout>
  );
}
