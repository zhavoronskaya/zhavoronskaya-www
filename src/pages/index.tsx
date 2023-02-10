import Head from "next/head";
import Layout from "@/components/layout/Layout";
import Home from "@/components/home/Home";

import { getAlbums, getScenes } from "@/db";
import { IAlbum, IScene } from "@/interfaces";

export async function getStaticProps() {
  const albums = await getAlbums();
  const scenes = await getScenes();
  return {
    props: { albums, scenes },
  };
}

type Props = {
  albums: IAlbum[];
  scenes: IScene[];
};

export default function HomePage({ albums, scenes }: Props) {
  return (
    <Layout>
      <Home albums={albums} scenes={scenes} />
    </Layout>
  );
}
