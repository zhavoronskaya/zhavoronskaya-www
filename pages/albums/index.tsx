import Head from "next/head";
import Link from "next/link";

import AlbumsPageLayout from "../../src/components/albums/AlbumsPageLayout";
import AlbumThumbnail from "../../src/components/albums/AlbumThumbnail";
import db from "../../src/db";
import { IAlbum } from "../../src/interfaces";

export async function getStaticProps() {
  return { props: { albums: db.ablums } };
}

export default function AlbumsPage(props: { albums: IAlbum[] }) {
  return (
    <>
      <Head>
        <title>Zhavoronskaya</title>
        <meta name="description" content="Artist portfolio" />
        {/* <link rel="icon" href="/logo.ico" /> */}
      </Head>

      <AlbumsPageLayout>
        {props.albums.map((album) => {
          return <AlbumThumbnail key={album.name} album={album} />;
        })}
      </AlbumsPageLayout>
    </>
  );
}
