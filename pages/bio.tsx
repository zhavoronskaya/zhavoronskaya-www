import Head from "next/head";
import Layout from "../src/components/layout/Layout";
import Bio from "../src/components/bio/Bio";

export default function BioPage() {
  return (
    <>
      <Head>
        <title>Zhavoronskaya</title>
        <meta name="description" content="Artist portfolio" />
        <link rel="icon" href="/Zhavoronok.ico" />
      </Head>
      <Layout>
        <Bio />
      </Layout>
    </>
  );
}
