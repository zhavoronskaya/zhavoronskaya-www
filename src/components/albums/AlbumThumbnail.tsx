import Link from "next/link";
import { IAlbum } from "@/interfaces";

export default function AlbumThumbnail(props: { album: IAlbum }) {
  return (
    <div className="mb-md">
      <Link href={`/albums/${props.album.slug}`}>
        <img src={props.album.cover} alt="Album" />
        <p className="mt-sm">{props.album.name}</p>
      </Link>
    </div>
  );
}
