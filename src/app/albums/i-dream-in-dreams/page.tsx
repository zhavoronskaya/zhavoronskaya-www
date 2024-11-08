import AlbumPageLayout from "@/components/albums/AlbumPageLayout";
import data from "./data";

export default function AlbumPage() {
  return (
    <AlbumPageLayout album={data}>
      <p>
        Explore the state of sleep. <br />
        The borderline state when it is difficult to differentiate reality from
        the imaginary. Consists of two parts - a nightmare and a sweet dream,
        which dream to the same person. Some scientific lines about how we
        perceive dreams and how our brain works during this are going through
        this album too like a parallel.
        <br />
        <br />
        <br />
        Mastered by garish_cyborg, artwork by Streletss.
        <br />
        Released on
        <a href="https://takoe.bandcamp.com/album/zhavoronskaya-i-dream-in-dreams-tak017e">
          TAKOE Record label, cat. [TAK016E]
        </a>
        March 27, 2021.
      </p>
    </AlbumPageLayout>
  );
}
