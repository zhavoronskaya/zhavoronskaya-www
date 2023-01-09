import Layout from "../layout/Layout";
import styles from "./AlbumsPageLayout.module.css";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

export default function AlbumsPageLayout(props: Props) {
  return (
    <Layout>
      {/* <h1 className="p20">ALBUMS</h1> */}
      <h2 className={styles.discr + " " + "px20"}>
        Gallery of selected music works since 2017-2021
      </h2>

      <p className="p20">
        HAVE A NICE TRAVELING
        <br />
        <br />
        <Link href="https://zhavoronskaya.bandcamp.com/">FIND ALL ALBUMS</Link>
      </p>

      <div className={styles.albumscontainer}>{props.children}</div>
    </Layout>
  );
}
