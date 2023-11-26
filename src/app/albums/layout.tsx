import ZhavoronskayaPlaneVertical from "@/components/scenes/ZhavoronskayaPlaneVertical";
import Container from "@/theme/components/Container";
import LayoutSidebar from "@/theme/components/LayoutSidebar";

type Props = {
  children: React.ReactNode;
};

export default function StaticLayout({ children }: Props) {
  return (
    <LayoutSidebar sidebar={<ZhavoronskayaPlaneVertical />}>
      <Container maxWidth="700px">{children}</Container>
    </LayoutSidebar>
  );
}
