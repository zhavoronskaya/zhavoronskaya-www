// @ts-expect-error
import description from "./description.html";
import { IAlbum } from "../../../interfaces";

const album: IAlbum = {
  name: "Gone beyond/White Half Moon",
  slug: "white-half",
  description,
  cover: "/albums/whitehalf.png",
  coverAlt: "Something",
  bandcamp: `<iframe style="border: 0; margin: 0 auto; max-width: 100%; width: 700px; height: 215px;" src="https://bandcamp.com/EmbeddedPlayer/album=3437204824/size=large/bgcol=ffffff/linkcol=f171a2/artwork=none/transparent=true/" seamless><a href="https://zhavoronskaya.bandcamp.com/album/gone-beyond-remastered-white-half-moon">GONE BEYOND (Remastered)/WHITE HALF MOON by Zhavoronskaya</a></iframe>`,
};

export default album;
