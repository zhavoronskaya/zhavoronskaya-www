import Head from "next/head";
import Layout from "../src/components/layout/Layout";
import Home from "../src/components/home/Home";
// import LogoScene from "../src/components/scenes/logoScene";
import { getAlbums, getScenes } from "../src/db";
import { IAlbum, IScene } from "../src/interfaces";


export async function getStaticProps() {
  const albums = await getAlbums()
  const scenes = await getScenes()
  return {
    props: { albums, scenes },
  }
}

type Props = {
  albums: IAlbum[],
  scenes: IScene[]
}

export default function HomePage({ albums, scenes }: Props) {
  return (
    <>
      <Head>
        <title>Zhavoronskaya</title>
        <meta name="description" content="Artist portfolio" />
        <link rel="icon" href="/Zhavoronok.ico" />
      </Head>
      <Layout>
        <Home albums={ablums} scenes={scenes} />
      </Layout>
    </>
  );
}
