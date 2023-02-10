import Link from "next/link";

import { IAlbum, IScene } from "@/interfaces";
import styles from "./Home.module.css";
import LogoImage from "../scenes/logoImage";

type Props = {
  albums: IAlbum[];
  scenes: IScene[];
};

export default function Home(props: Props) {
  return (
    <>
      <LogoImage />
      <div className="py30"></div>
      <div className={styles.title + " " + "py20"}>
        <h2>ALBUMS</h2>

        <h2>
          <Link href="/albums">FIND MORE</Link>
        </h2>
      </div>

      <div className={styles.albumscontainer}>
        {/* <img src="/albums/dreams.png" alt="Album" />
        <img src="/albums/crystal.png" alt="Album" />
        <img src="/albums/whitehalf.png" alt="Album" />
        <img src="/albums/cxema.png" alt="Album" />
        <img src="/albums/reality.png" alt="Album" />
        <img src="/albums/pcp.png" alt="Album" /> */}
        {props.albums.map((album) => {
          return (
            <Link key={album.slug} href={`/albums/${album.slug}`}>
              <img src={album.cover} alt="Album" />
            </Link>
          );
        })}
      </div>
      <div className="py30"></div>
      <div className={styles.title + " " + "py20"}>
        <h2>ART</h2>
        <h2>
          <Link href="/scenes">VIEW</Link>
        </h2>
      </div>
      <div className={styles.artcontainer}>
        {props.scenes.map((scene) => {
          return (
            <Link key={scene.slug} href={`/scenes/${scene.slug}`}>
              <img src={scene.cover} alt="Scene" />
            </Link>
          );
        })}
      </div>
      <div className="py30"></div>
      <div className={styles.title + " " + "py20"}>
        <h2>CONNECT</h2>
        <h2 className={styles.contact}>
          <Link href="/contact">CONTACT ME</Link>
        </h2>
      </div>
    </>
  );
}
