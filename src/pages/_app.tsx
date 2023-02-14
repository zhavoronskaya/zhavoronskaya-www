import "@/styles/variables.css";
import "@/styles/globals.css";
import "@/styles/utils.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Zhavoronskaya</title>
        <meta name="description" content="Artist portfolio" />
        <link rel="icon" href="/Zhavoronok.ico" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@1&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} className="test" />
    </>
  );
}
