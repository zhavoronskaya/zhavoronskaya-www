import AlbumPageLayout from "@/components/albums/AlbumPageLayout";
import data from "./data";

export default function AlbumPage() {
  return (
    <AlbumPageLayout album={data}>
      <p>
        Split with СХЕМА РУХУ ПО КОЛУ (Ukraine). Tapes limited to 10 copies.
        <br />
        <br />
        <br />
        Released on
        <a href=" https://begushchijchelovek.bandcamp.com/album/016-zhavoronskaya">
          БЕГУЩИЙ ЧЕЛОВЕК Record label [БЧ016]
        </a>
        November 11, 2018.
      </p>
    </AlbumPageLayout>
  );
}
