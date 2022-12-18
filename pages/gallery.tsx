import Head from 'next/head'
import Layout from '../src/components/layout/Layout'

export default function GalleryPage() {
    return (
        <>
          <Head>
            <title>Zhavoronskaya</title>
            <meta name="description" content="Artist portfolio" />
            {/* <link rel="icon" href="/logo.ico" /> */}
          </Head>
          <Layout > </Layout>
        </>
      );
}