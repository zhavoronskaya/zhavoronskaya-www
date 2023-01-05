import Head from "next/head";
import Gallery from "../src/components/gallery/Gallery";
import Layout from "../src/components/layout/Layout";

export default function GalleryPage() {
  return (
    <>
      <Head>
        <title>Zhavoronskaya</title>
        <meta name="description" content="Artist portfolio" />
        {/* <link rel="icon" href="/logo.ico" /> */}
      </Head>
      <Layout>
        <Gallery />
      </Layout>
    </>
  );
}
