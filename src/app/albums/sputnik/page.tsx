import AlbumPageLayout from "@/components/albums/AlbumPageLayout";
import data from "./data";

export default function AlbumPage() {
  return (
    <AlbumPageLayout album={data}>
      <p>
        Each of us must have our own Sputnik 111.
        <br />
        Album-collaboration with
        <a href="https://ruinsofmelancholia.bandcamp.com/">
          Ruins of Melancholia
        </a>
        . Were used records of original Soviet synthesizer Lell-22.
        <br />
        <br />
        <br />
        Released December 9, 2017.
      </p>
    </AlbumPageLayout>
  );
}
