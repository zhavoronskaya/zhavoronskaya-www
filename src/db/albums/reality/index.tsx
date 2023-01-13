// @ts-expect-error
import description from "./description.html";
import { IAlbum } from "../../../interfaces";

const album: IAlbum = {
  name: "reality",
  slug: "reality",
  description,
  cover: "/albums/reality.png",
  coverAlt: "Something",
  bandcamp: `<iframe style="border: 0; margin: 0 auto; max-width: 100%; width: 700px; height: 241px;" src="https://bandcamp.com/EmbeddedPlayer/album=1984374705/size=large/bgcol=ffffff/linkcol=f171a2/artwork=none/transparent=true/" seamless><a href="https://zhavoronskaya.bandcamp.com/album/zhavoronskaya-r">Zhavoronskaya — R by Zhavoronskaya</a></iframe>`,
};

export default album;
