// @ts-expect-error
import description from "./description.html";
import { IAlbum } from "../../../interfaces";

const album: IAlbum = {
  name: "PCP",
  slug: "pcp",
  description,
  cover: "/albums/pcp.png",
  coverAlt: "Something",
  bandcamp: `<iframe style="border: 0; margin: 0 auto; max-width: 100%; width: 700px; height: 208px;" src="https://bandcamp.com/EmbeddedPlayer/album=1471413623/size=large/bgcol=ffffff/linkcol=f171a2/artwork=none/transparent=true/" seamless><a href="https://zhavoronskaya.bandcamp.com/album/pcp">PCP by Zhavoronskaya</a></iframe>`,
};

export default album;
