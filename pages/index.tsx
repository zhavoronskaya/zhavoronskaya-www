import Head from "next/head";
import Layout from "../src/components/layout/Layout";
import Home from "../src/components/home/Home";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Zhavoronskaya</title>
        <meta name="description" content="Artist portfolio" />
        {/* <link rel="icon" href="/logo.ico" /> */}
      </Head>
      <Layout>bla </Layout>
      <Home />
    </>
  );
}
