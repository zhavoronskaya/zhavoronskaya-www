import Link from "next/link";
import { IAlbum } from "../../interfaces";
import styles from "./AlbumThumbnail.module.css";

export default function AlbumThumbnail(props: { album: IAlbum }) {
  return (
    <div className={styles.albumelement}>
      <Link href={`/albums/${props.album.slug}`}>
        <img src={props.album.cover} alt="Album" />
        <p className="py10">{props.album.name}</p>
      </Link>
    </div>
  );
}
