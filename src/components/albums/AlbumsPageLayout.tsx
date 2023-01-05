import Layout from "../layout/Layout";
import styles from "./AlbumsPageLayout.module.css";

type Props = {
  children: React.ReactNode;
};

export default function AlbumsPageLayout(props: Props) {
  return (
    <Layout>
      <h2 className="p20">Albums</h2>
      <p className="p20">Bla bla bla bla</p>

      <div className={styles.albumscontainer}>{props.children}</div>
    </Layout>
  );
}
