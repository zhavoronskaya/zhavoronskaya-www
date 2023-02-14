import { IAlbum } from "../../../interfaces";

const description = `
States of mind, what if the soul really exists? <br />
Thanks to all who supported me to make music during this hard time, 
especially to my love and the author of the cover artwork.
<br />
<br />
<br />
All tracks were written & recorded in 2022. Live saxophone.
Artwork by Streletss.
<br />
Released February 14, 2023.
`;

const album: IAlbum = {
  name: "States",
  slug: "states",
  description,
  cover: "/albums/states.png",
  coverAlt: "Something",
  bandcamp: `<iframe style="border: 0; margin: 0 auto; max-width: 100%; width: 700px; height: 472px;" src="https://bandcamp.com/EmbeddedPlayer/album=246087155/size=large/bgcol=ffffff/linkcol=f171a2/artwork=none/transparent=true/" seamless><a href="https://zhavoronskaya.bandcamp.com/album/states">States by Zhavoronskaya</a></iframe>`,
  year: "2023",
  genre: "experimental, ambient, cross genre, saxophone",
};

export default album;
