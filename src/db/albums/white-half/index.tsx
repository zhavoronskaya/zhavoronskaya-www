import { IAlbum } from "../../../interfaces";

const description = `
Compilation of two albums on Vinyl LP. <br />
One of them is the re-released EP “Gone Beyond” which transmits some personal
feelings about coexisting with the marine world. The second is inspired by Arab
world and long-standing love for Muslimgauze. Worked with materials from three
wars in the East (Syria, Iraq, and Chechnya). <br />
Used a lot of various stringed instruments like gusli, finish kantele, and field
recordings. <br />
<br />
<br />
Mastered by Edward Sol, artwork by Empty House.
<br />
Released November 21, 2020.
`;

const album: IAlbum = {
  name: "Gone beyond/White Half Moon",
  slug: "white-half",
  description,
  cover: "/albums/whitehalf.png",
  coverAlt: "Something",
  bandcamp: `<iframe style="border: 0; margin: 0 auto; max-width: 100%; width: 700px; height: 215px;" src="https://bandcamp.com/EmbeddedPlayer/album=3437204824/size=large/bgcol=ffffff/linkcol=f171a2/artwork=none/transparent=true/" seamless><a href="https://zhavoronskaya.bandcamp.com/album/gone-beyond-remastered-white-half-moon">GONE BEYOND (Remastered)/WHITE HALF MOON by Zhavoronskaya</a></iframe>`,
  year: "2020",
};

export default album;
