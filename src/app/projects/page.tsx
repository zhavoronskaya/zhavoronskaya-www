import Container from "@/theme/components/Container";
import LayoutSidebar from "@/theme/components/LayoutSidebar";
import ZhavoronskayaPlaneVertical from "@/components/scenes/ZhavoronskayaPlaneVertical";

export default function ProjectsPage() {
  return (
    <LayoutSidebar sidebar={<ZhavoronskayaPlaneVertical />}>
      <Container maxWidth="700px">This page is in development</Container>
    </LayoutSidebar>
  );
}
