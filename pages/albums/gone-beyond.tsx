import Head from "next/head";
import AlbumPageLayout from "../../src/components/albums/AlbumPageLayout";

export const album = {
  name: "Gone beyond/White Half Moon",
  path: "/albums/gone-beyond",
  description:
    "Consists of two parts. One of them is the re-released EP “Gone Beyond” which transmits some personal feelings about coexisting with the marine world. The second is inspired by Arab world and long-standing love for Muslimgauze. Worked with materials from three wars in the East (Syria, Iraq, and Chechnya). The audio-recordings of Dzhokhar Dudayev, who was the former President of the Chechen Republic were a great source of inspiration. Used a lot of various stringed instruments like gusli, finish kantele, and field recordings.",
  cover: "/albums/whitehalf.png",
  coverAlt: "Something",
  bandcamp: `<iframe style="border: 0; width: 350px; height: 470px;" src="https://bandcamp.com/EmbeddedPlayer/album=3437204824/size=large/bgcol=ffffff/linkcol=333333/tracklist=false/transparent=true/" seamless><a href="https://zhavoronskaya.bandcamp.com/album/gone-beyond-remastered-white-half-moon">GONE BEYOND (Remastered)/WHITE HALF MOON by Zhavoronskaya</a></iframe>`,
};

export default function AlbumGoneBeyond() {
  return (
    <>
      <Head>
        <title>Zhavoronskaya</title>
        <meta name="description" content="Artist portfolio" />
        {/* <link rel="icon" href="/logo.ico" /> */}
      </Head>
      <AlbumPageLayout album={album}></AlbumPageLayout>;
    </>
  );
}
