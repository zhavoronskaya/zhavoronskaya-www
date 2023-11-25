import AlbumPageLayout from "@/components/albums/AlbumPageLayout";
import data from "./data";

export default function AlbumPage() {
  return (
    <AlbumPageLayout album={data}>
      <p>
        Some view of reality.
        <br />
        Like losing understanding and the borders of present. Industrial sound
        completely fills listener of lost feeling.
        <br />
        <br />
        <br />
        Released{" "}
        <a href="https://takoe.bandcamp.com/album/zhavoronskaya-r-tak004e">
          on TAKOE Record label, cat. [TAK004E]
        </a>
        <br />
        <br />
        January 18, 2019.
      </p>
    </AlbumPageLayout>
  );
}
