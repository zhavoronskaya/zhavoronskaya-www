import { IAlbum } from "@/interfaces";

const dream: IAlbum = {
  name: "I dream in dreams",
  label: "A twilight zone where reality blurs with fantasy",
  tags: ["experimental", "fieldrecordings", "ambient"],
  images: [
    {
      width: 600,
      height: 600,
      src: "/albums/dream/dream.png",
      alt: "I dream in dreams",
    },
    {
      width: 600,
      height: 600,
      src: "/albums/dream/dream1.png",
      alt: "I dream in dreams",
    },
  ],
  info: {
    mastered: "garish_cyborg",
    artwork: "Streletss",
    released: "TAKOE Record label",
    date: "March 27, 2021",
    href: "https://takoe.bandcamp.com/album/zhavoronskaya-i-dream-in-dreams-tak017e",
  },
};

export default dream;
