import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import LogoPage from "./LogoPage";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <LogoPage />
    </ShotPageLayout>
  );
}
