import Head from "next/head";
import Contact from "../src/components/contact/Contact";
import { ContentLayout } from "../src/components/layout/Layout";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Zhavoronskaya</title>
        <meta name="description" content="Artist portfolio" />
        <link rel="icon" href="/Zhavoronok.ico" />
      </Head>
      <ContentLayout>
        <Contact />
      </ContentLayout>
    </>
  );
}
