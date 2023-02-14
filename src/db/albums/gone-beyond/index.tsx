import { IAlbum } from "../../../interfaces";

const description = `
Dive into the sea. <br />

Released in cassette format. Were used records of finnish harp kantele, voice,
synths.
<br />
<br />
<br />
Released December 7, 2018.
`;

const album: IAlbum = {
  name: "Gone Beyond",
  slug: "gone-beyond",
  description,
  cover: "/albums/gonebeyond.png",
  coverAlt: "Something",
  bandcamp: `<iframe style="border: 0; margin: 0 auto; max-width: 100%; width: 700px; height: 208px;" src="https://bandcamp.com/EmbeddedPlayer/album=4241050116/size=large/bgcol=ffffff/linkcol=f171a2/artwork=none/transparent=true/" seamless><a href="https://zhavoronskaya.bandcamp.com/album/ep-gone-beyond">EP gone beyond. by Zhavoronskaya</a></iframe>`,
  year: "2018",
  genre: "chillwave, ambient",
};

export default album;
