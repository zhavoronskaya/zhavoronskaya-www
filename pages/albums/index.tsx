import Head from "next/head";
import Link from "next/link";

import AlbumsPageLayout from "../../src/components/albums/AlbumsPageLayout";
import AlbumThumbnail from "../../src/components/albums/AlbumThumbnail";

import { album as goneBeyond } from "./gone-beyond";
import { album as idreamed } from "./i-dreamed-in-dreams";

const ablums = [goneBeyond, idreamed];

export default function AlbumsPage() {
  return (
    <>
      <Head>
        <title>Zhavoronskaya</title>
        <meta name="description" content="Artist portfolio" />
        {/* <link rel="icon" href="/logo.ico" /> */}
      </Head>

      <AlbumsPageLayout>
        {ablums.map((album) => {
          return <AlbumThumbnail key={album.name} album={album} />;
        })}
      </AlbumsPageLayout>
    </>
  );
}
