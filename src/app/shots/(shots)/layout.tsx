import { Fragment, useEffect } from "react";

type Props = {
  children: React.ReactNode;
};
const ShotLayout = ({ children }: Props) => {
  return <Fragment>{children}</Fragment>;
};

export default ShotLayout;
