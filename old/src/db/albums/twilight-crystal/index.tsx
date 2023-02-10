import { IAlbum } from "../../../interfaces";

const description = `
Traveling between the ribs of magic crystal in searching love. <br />
The sound is completly different from other releases by its lightness and
nostalgic notes. <br />
For creating these two songs were used saxophone and various samples from old
rare records.
<br />
<br />
<br />
Released on
<a
  href="https://naughtynightrecords.bandcamp.com/album/t-w-i-l-i-g-h-t-c-r-y-s-t-a-l"
>
  Naughty Night Records Label
</a>
February 5, 2019.
`;

const album: IAlbum = {
  name: "twilight crystal",
  slug: "twilight-crystal",
  description,
  cover: "/albums/crystal.png",
  coverAlt: "Something",
  bandcamp: `<iframe style="border: 0; margin: 0 auto; max-width: 100%; width: 700px; height: 208px;" src="https://bandcamp.com/EmbeddedPlayer/album=1023492891/size=large/bgcol=ffffff/linkcol=f171a2/artwork=none/transparent=true/" seamless><a href="https://zhavoronskaya.bandcamp.com/album/twilight-crystal">twilight crystal by Zhavoronskaya</a></iframe>`,
};

export default album;
