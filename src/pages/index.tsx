import Head from "next/head";
import Layout from "@/components/layout/Layout";
import Home from "@/components/home/Home";

import { getGalleryScenes, getSelectedAlbums } from "@/db";
import { IAlbum, IScenesGallery } from "@/interfaces";

export async function getStaticProps() {
  const albums = await getSelectedAlbums();
  const scenes = await getGalleryScenes();
  return {
    props: { albums, scenes },
  };
}

type Props = {
  albums: IAlbum[];
  scenes: IScenesGallery;
};

export default function HomePage({ albums, scenes }: Props) {
  return (
    <Layout>
      <Home albums={albums} scenes={scenes} />
    </Layout>
  );
}
