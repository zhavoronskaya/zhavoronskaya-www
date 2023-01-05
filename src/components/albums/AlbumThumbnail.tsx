import Link from "next/link";
import { IAlbum } from "../../interfaces";
import styles from "./AlbumThumbnail.module.css";

export default function AlbumThumbnail(props: { album: IAlbum }) {
  return (
    <div className={styles.albumelement}>
      <Link href={props.album.path}>
        <img src={props.album.cover} alt="Album" />
        <p>{props.album.name}</p>
      </Link>
    </div>
  );
}
