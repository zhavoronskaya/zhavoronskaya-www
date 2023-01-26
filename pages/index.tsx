import Head from "next/head";
import Layout from "../src/components/layout/Layout";
import Home from "../src/components/home/Home";
import LogoScene from "../src/components/scenes/logoScene";
import db from "../src/db";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Zhavoronskaya</title>
        <meta name="description" content="Artist portfolio" />
        <link rel="icon" href="/Zhavoronok.ico" />
      </Head>
      <Layout>
        <LogoScene />
        <Home albums={db.ablums} scenes={db.scenes} />
      </Layout>
    </>
  );
}
