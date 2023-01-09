import Head from "next/head";
import Layout from "../src/components/layout/Layout";
import Home from "../src/components/home/Home";
import LineBezier from "../src/components/scenes/lineBezier";
import db from "../src/db";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Zhavoronskaya</title>
        <meta name="description" content="Artist portfolio" />
        {/* <link rel="icon" href="/logo.ico" /> */}
      </Head>
      <Layout>
        <LineBezier />
        <Home albums={db.ablums} scenes={db.scenes} />
      </Layout>
    </>
  );
}
