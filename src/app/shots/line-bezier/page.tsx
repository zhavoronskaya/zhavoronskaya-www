import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import LineBezier from "./LineBezier";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <LineBezier />
    </ShotPageLayout>
  );
}
