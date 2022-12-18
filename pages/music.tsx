import Head from 'next/head'
import Layout from '../src/components/layout/Layout'
import Music from '../src/components/music/Music'

export default function MusicPage() {
    return (
        <>
          <Head>
            <title>Zhavoronskaya</title>
            <meta name="description" content="Artist portfolio" />
            {/* <link rel="icon" href="/logo.ico" /> */}
          </Head>
          <Layout > 
            <Music />
          </Layout>
        </>
      );
}