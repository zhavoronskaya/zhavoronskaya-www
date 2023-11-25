import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import ShellSea from "./ShellSea";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <ShellSea />
    </ShotPageLayout>
  );
}
