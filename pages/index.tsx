import Head from "next/head";
import Layout from "../src/components/layout/Layout";
import Home from "../src/components/home/Home";
import ParticleLine from "../src/components/scenes/particleLine";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Zhavoronskaya</title>
        <meta name="description" content="Artist portfolio" />
        {/* <link rel="icon" href="/logo.ico" /> */}
      </Head>
      <Layout>
        <ParticleLine />
        <Home />
      </Layout>
      {/* <Home /> */}
    </>
  );
}
