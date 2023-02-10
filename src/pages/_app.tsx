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
      </Head>
      <Component {...pageProps} className="test" />
    </>
  );
}
