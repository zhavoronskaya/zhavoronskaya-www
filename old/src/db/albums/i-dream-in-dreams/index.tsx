import { IAlbum } from "../../../interfaces";

const description = `
Explore the state of sleep. <br />
The borderline state when it is difficult to differentiate reality from the
imaginary. Consists of two parts - a nightmare and a sweet dream, which dream to
the same person. Some scientific lines about how we perceive dreams and how our
brain works during this are going through this album too like a parallel.
<br />
<br />
<br />
Mastered by garish_cyborg, artwork by Streletss.
<br />
Released on
<a
  href="https://takoe.bandcamp.com/album/zhavoronskaya-i-dream-in-dreams-tak017e"
>
  TAKOE Record label, cat. [TAK016E]
</a>
March 27, 2021.
`;

const album: IAlbum = {
  name: "i dream in dreams",
  slug: "i-dream-in-dreams",
  description,
  cover: "/albums/dreams.png",
  coverAlt: "Something",
  bandcamp: `<iframe style="border: 0; margin: 0 auto; max-width: 100%; width: 700px; height: 472px;" src="https://bandcamp.com/EmbeddedPlayer/album=3623538815/size=large/bgcol=ffffff/linkcol=f171a2/artwork=none/transparent=true/" seamless><a href="https://zhavoronskaya.bandcamp.com/album/i-dream-in-dreams">I dream in dreams by Zhavoronskaya</a></iframe>`,
};

export default album;
