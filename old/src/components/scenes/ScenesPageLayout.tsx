import { ContentLayout } from "../layout/Layout";
import styles from "./ScenesPageLayout.module.css";
// import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

export default function ScenesPageLayout(props: Props) {
  return (
    <ContentLayout headerSlot={<Header />}>
      <div className={styles.container}>{props.children}</div>
    </ContentLayout>
  );
}

const Header = () => {
  return <h2>Gallery of generative art works</h2>;
};
