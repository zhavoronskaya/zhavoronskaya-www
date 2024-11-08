import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Experimental from "./Experimental";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Experimental />
    </ShotPageLayout>
  );
}
