import ShotPageLayout from "@/components/shots/ShotPageLayout";
import shot from "./data";
import Mandelbrot from "./Mandelbrot";

export default function Shot() {
  return (
    <ShotPageLayout shot={shot}>
      <Mandelbrot />
    </ShotPageLayout>
  );
}
