import { promises as fs } from "fs";
import Head from "next/head";
import { GetStaticPropsContext } from "next";

import { IAlbum } from "../../src/interfaces";
import db from "../../src/db";
import AlbumPageLayout from "../../src/components/albums/AlbumPageLayout";

export async function getStaticPaths() {
  const paths = db.ablums.map((album) => {
    return { params: { slug: album.slug } };
  });

  return { paths, fallback: false };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const slug = context?.params?.slug;
  const album = db.ablums.find((album) => album.slug === slug);
  const albumIdx = db.ablums.findIndex((album) => album.slug === slug);
  const prevAlbumSlug = db.ablums[albumIdx - 1]?.slug || null;
  const nextAlbumSlug = db.ablums[albumIdx + 1]?.slug || null;

  return { props: { album, prevAlbumSlug, nextAlbumSlug } };
}

type Props = {
  album: IAlbum;
  nextAlbumSlug?: string;
  prevAlbumSlug?: string;
};

export default function AlbumPage(props: Props) {
  const { album } = props;

  return (
    <>
      <Head>
        <title>Zhavoronskaya</title>
        <meta name="description" content="Artist portfolio" />
        <link rel="icon" href="/Zhavoronok.ico" />
      </Head>

      {album && (
        <AlbumPageLayout
          album={album}
          prevAlbumSlug={props.prevAlbumSlug}
          nextAlbumSlug={props.nextAlbumSlug}
        />
      )}
    </>
  );
}
