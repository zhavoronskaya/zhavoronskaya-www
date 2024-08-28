import BaseLayout from "@/components/BaseLayout/BaseLayout";

type Props = {
  children: React.ReactNode;
};
const ShotLayout = ({ children }: Props) => {
  return <BaseLayout>{children}</BaseLayout>;
};

export default ShotLayout;
