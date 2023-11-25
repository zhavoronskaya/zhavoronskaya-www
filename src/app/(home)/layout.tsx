import BaseLayout from "@/theme/components/BaseLayout";
import HeroScene from "./HeroScene";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BaseLayout heroSection={<HeroScene />}>{children}</BaseLayout>;
}
