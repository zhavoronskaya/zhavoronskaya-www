import { IAlbum } from "@/interfaces";

const crystal: IAlbum = {
  name: "Twilight crystal",
  label: "Traveling inside magic crystal in search of love",
  tags: ["vaporwave", "chillwave", "sax", "vintage"],
  images: [
    {
      width: 600,
      height: 600,
      src: "/albums/crystal/crystal.png",
      alt: "Twilight crystal",
    },
    {
      width: 600,
      height: 600,
      src: "/albums/crystal/crystal1.png",
      alt: "Twilight crystal",
    },
  ],
  info: {
    mastered: "Zhavoronskaya",
    artwork: "Zhavoronskaya",
    released: "Naughty Night Record Label",
    date: "February 5, 2019",
    href: "https://naughtynightrecords.bandcamp.com/album/t-w-i-l-i-g-h-t-c-r-y-s-t-a-l",
  },
};

export default crystal;
