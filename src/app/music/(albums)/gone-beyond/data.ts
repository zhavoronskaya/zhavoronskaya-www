import { IAlbum } from "@/interfaces";

const moon: IAlbum = {
  name: "Gone beyond & White Half Moon",
  label: "Compilation of two albums",
  tags: ["experimental", "noise", "drone", "chillwave"],
  images: [
    {
      width: 600,
      height: 600,
      src: "/albums/moon/moon2.png",
      alt: "Gone beyond & White Half Moon",
    },
    {
      width: 600,
      height: 600,
      src: "/albums/moon/moon1.png",
      alt: "Gone beyond & White Half Moon",
    },
  ],
  info: {
    mastered: "Edward Sol",
    artwork: "Empty House",
    released: "Vinyl LP, made in Ukraine",
    date: "November 21, 2020",
    href: "https://zhav0ronskaya.bandcamp.com/album/gone-beyond-remastered-white-half-moon",
  },
};

export default moon;
