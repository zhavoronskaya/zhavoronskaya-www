import { IAlbum } from "../../../interfaces";

const description = `
Some view of reality.
<br />
Like losing understanding and the borders of present. Industrial sound
completely fills listener of lost feeling.
<br />
<br />
<br />
Released
<a href="https://takoe.bandcamp.com/album/zhavoronskaya-r-tak004e">
  on TAKOE Record label, cat. [TAK004E]
</a>
January 18, 2019.

`;

const album: IAlbum = {
  name: "reality",
  slug: "reality",
  description,
  cover: "/albums/reality.png",
  coverAlt: "Something",
  bandcamp: `<iframe style="border: 0; margin: 0 auto; max-width: 100%; width: 700px; height: 241px;" src="https://bandcamp.com/EmbeddedPlayer/album=1984374705/size=large/bgcol=ffffff/linkcol=f171a2/artwork=none/transparent=true/" seamless><a href="https://zhavoronskaya.bandcamp.com/album/zhavoronskaya-r">Zhavoronskaya — R by Zhavoronskaya</a></iframe>`,
  year: "2019",
  genre: "experimental, dub, noise",
};

export default album;
