import BaseLayout from "@/components/BaseLayout/BaseLayout";

type Props = {
  children: React.ReactNode;
};
const AlbumLayout = ({ children }: Props) => {
  return <BaseLayout>{children}</BaseLayout>;
};

export default AlbumLayout;
