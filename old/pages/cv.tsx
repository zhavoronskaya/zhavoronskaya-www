import Head from "next/head";
import { ContentLayout } from "../src/components/layout/Layout";
import Cv from "../src/components/cv/Cv";

export default function CvPage() {
  return (
    <>
      <Head>
        <title>Zhavoronskaya</title>
        <meta name="description" content="Artist portfolio" />
        <link rel="icon" href="/Zhavoronok.ico" />
      </Head>
      <ContentLayout>
        <Cv />
      </ContentLayout>
    </>
  );
}
