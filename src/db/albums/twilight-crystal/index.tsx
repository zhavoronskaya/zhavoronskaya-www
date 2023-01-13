// @ts-expect-error
import description from "./description.html";
import { IAlbum } from "../../../interfaces";

const album: IAlbum = {
  name: "twilight crystal",
  slug: "twilight-crystal",
  description,
  cover: "/albums/crystal.png",
  coverAlt: "Something",
  bandcamp: `<iframe style="border: 0; margin: 0 auto; max-width: 100%; width: 700px; height: 208px;" src="https://bandcamp.com/EmbeddedPlayer/album=1023492891/size=large/bgcol=ffffff/linkcol=f171a2/artwork=none/transparent=true/" seamless><a href="https://zhavoronskaya.bandcamp.com/album/twilight-crystal">twilight crystal by Zhavoronskaya</a></iframe>`,
};

export default album;
