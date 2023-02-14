import { IAlbum } from "../../../interfaces";

const description = `
Live Set from OSNOVA Kyiv party 26 April 2019. <br />
Industrial, noise, quite experimental sound trip about 'happy' (ironic) road.
<br />
<br />
<br />
Released May 16, 2019.

`;

const album: IAlbum = {
  name: "PCP",
  slug: "pcp",
  description,
  cover: "/albums/pcp.png",
  coverAlt: "Something",
  bandcamp: `<iframe style="border: 0; margin: 0 auto; max-width: 100%; width: 700px; height: 208px;" src="https://bandcamp.com/EmbeddedPlayer/album=1471413623/size=large/bgcol=ffffff/linkcol=f171a2/artwork=none/transparent=true/" seamless><a href="https://zhavoronskaya.bandcamp.com/album/pcp">PCP by Zhavoronskaya</a></iframe>`,
  year: "2019",
  genre: "experimental, noise, industrial",
};

export default album;
