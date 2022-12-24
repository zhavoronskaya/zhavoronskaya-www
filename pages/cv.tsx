import Head from "next/head";
import Layout from "../src/components/layout/Layout";
import Cv from "../src/components/cv/Cv";

export default function CvPage() {
  return (
    <>
      <Head>
        <title>Zhavoronskaya</title>
        <meta name="description" content="Artist portfolio" />
        {/* <link rel="icon" href="/logo.ico" /> */}
      </Head>
      <Layout>
        <Cv />
      </Layout>
    </>
  );
}
