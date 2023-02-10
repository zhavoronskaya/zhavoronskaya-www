import { GetStaticPropsContext } from "next";

import { IAlbum } from "@/interfaces";
import { getAlbums } from "@/db";
import AlbumPageLayout from "@/components/albums/AlbumPageLayout";

export async function getStaticPaths() {
  const albums = await getAlbums();
  const paths = albums.map((album) => {
    return { params: { slug: album.slug } };
  });

  return { paths, fallback: false };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const albums = await getAlbums();
  const slug = context?.params?.slug;
  const album = albums.find((album) => album.slug === slug);
  const albumIdx = albums.findIndex((album) => album.slug === slug);
  const prevAlbumSlug = albums[albumIdx - 1]?.slug || null;
  const nextAlbumSlug = albums[albumIdx + 1]?.slug || null;

  return { props: { album, prevAlbumSlug, nextAlbumSlug } };
}

type Props = {
  album: IAlbum;
  nextAlbumSlug?: string;
  prevAlbumSlug?: string;
};

export default function AlbumPage({
  album,
  prevAlbumSlug,
  nextAlbumSlug,
}: Props) {
  if (!album) return null;

  return (
    <AlbumPageLayout
      album={album}
      prevAlbumSlug={prevAlbumSlug}
      nextAlbumSlug={nextAlbumSlug}
    />
  );
}
