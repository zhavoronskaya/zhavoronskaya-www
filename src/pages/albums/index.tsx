import Head from "next/head";
import Link from "next/link";

import AlbumsPageLayout from "@/components/albums/AlbumsPageLayout";
import AlbumThumbnail from "@/components/albums/AlbumThumbnail";
import { getAlbums } from "@/db";
import { IAlbum } from "@/interfaces";

export async function getStaticProps() {
  const albums = await getAlbums();
  const props = { albums };
  return { props };
}

type Props = {
  albums: IAlbum[];
};
export default function AlbumsPage({ albums }: Props) {
  return (
    <AlbumsPageLayout>
      {albums.map((album) => {
        return <AlbumThumbnail key={album.name} album={album} />;
      })}
    </AlbumsPageLayout>
  );
}
