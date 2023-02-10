import Link from "next/link";
import styles from "./AlbumsPageLayout.module.css";
import { LayoutWithSidebar } from "../layout/Layout";

type Props = {
  children: React.ReactNode;
};

export default function AlbumsPageLayout(props: Props) {
  return (
    <LayoutWithSidebar>
      {/* <h1 className="p20">ALBUMS</h1> */}
      <h2 className={styles.discr}>
        Gallery of selected music works since 2017-2021
      </h2>

      <p>
        HAVE A NICE TRAVELING
        <br />
        <br />
        <Link href="https://zhavoronskaya.bandcamp.com/">FIND ALL ALBUMS</Link>
      </p>

      <div className={styles.albumscontainer}>{props.children}</div>
    </LayoutWithSidebar>
  );
}
