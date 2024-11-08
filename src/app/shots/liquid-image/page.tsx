import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import ImageLiquid from "./ImageLiquid";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <ImageLiquid />
    </ShotPageLayout>
  );
}
