import AlbumPageLayout from "@/components/albums/AlbumPageLayout";
import data from "./data";

export default function AlbumPage() {
  return (
    <AlbumPageLayout album={data}>
      <p>
        Live Set from OSNOVA Kyiv party 26 April 2019. <br />
        Industrial, noise, quite experimental sound trip about 'happy' (ironic)
        road.
        <br />
        <br />
        <br />
        Released May 16, 2019.
      </p>
    </AlbumPageLayout>
  );
}
