import Head from "next/head";

import { getGalleryScenes, getSelectedAlbums } from "@/db";
import { IAlbum, IScenesGallery } from "@/interfaces";
import Layout from "@/components/layout/Layout";
import Home from "@/components/home/Home";
import LogoImage from "@/components/scenes/logoImage";

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
    <Layout heroSection={<LogoImage />}>
      <Home albums={albums} scenes={scenes} />
    </Layout>
  );
}
