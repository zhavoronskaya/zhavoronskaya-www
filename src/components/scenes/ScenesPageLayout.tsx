import Layout from "../layout/Layout";
import styles from "./ScenesPageLayout.module.css";
// import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

export default function ScenesPageLayout(props: Props) {
  return (
    <Layout>
      <h2 className={styles.discr + " " + "px20"}>
        Gallery of generative art works
      </h2>

      <div className={styles.artscontainer}>{props.children}</div>
    </Layout>
  );
}
