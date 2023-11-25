import LogoSideBarScene from "@/theme/components/LogoSideBar";
import BaseLayout from "@/theme/components/BaseLayout";

export default function ProjectsPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BaseLayout sidebar={<LogoSideBarScene />}>This page is cooking</BaseLayout>
  );
}
