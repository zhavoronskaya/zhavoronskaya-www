import AlbumPageLayout from "@/components/albums/AlbumPageLayout";
import data from "./data";

export default function AlbumPage() {
  return (
    <AlbumPageLayout album={data}>
      <p>
        Dive into the sea. <br />
        Released in cassette format. Were used records of finnish harp kantele,
        voice, synths.
        <br />
        <br />
        <br />
        Released December 7, 2018.
      </p>
    </AlbumPageLayout>
  );
}
