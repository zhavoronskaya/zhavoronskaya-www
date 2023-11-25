import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import MoonSky from "./MoonSky";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <MoonSky />
    </ShotPageLayout>
  );
}
