import { SocialLinks } from "@/constants";

type Props = {
  className?: string;
};

export default function Footer() {
  return (
    <footer className="flex p-4 gap-4 text-sm justify-between">
      <div className="flex gap-4">
        <a href={SocialLinks.TELEGRAM}>
          Telegram
          {/* <TelegramIcon size="25px" /> */}
        </a>
        <a href={SocialLinks.INSTAGRAM}>
          Instagram
          {/* <SoundcloudIcon size="25px" /> */}
        </a>
        <a href={SocialLinks.INSTAGRAM}>
          Twitter
          {/* <SoundcloudIcon size="25px" /> */}
        </a>
        <a href={SocialLinks.BANDCAMP}>
          Bandcamp
          {/* <BandcampIcon size="25px" /> */}
        </a>
        <a href={SocialLinks.SOUNDCLOUD}>
          Soundcloud
          {/* <SoundcloudIcon size="25px" /> */}
        </a>
        <a href={SocialLinks.DISCOGS}>
          Discogs
          {/* <SoundcloudIcon size="25px" /> */}
        </a>
      </div>

      <a href="" className="align-self-end">
        {SocialLinks.EMAIL}
      </a>
    </footer>
  );
}
