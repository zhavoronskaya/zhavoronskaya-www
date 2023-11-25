import LogoSideBarScene from "@/theme/components/LogoSideBar";
import BaseLayout from "@/theme/components/BaseLayout";

export default function StaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BaseLayout sidebar={<LogoSideBarScene />}>{children}</BaseLayout>;
}
