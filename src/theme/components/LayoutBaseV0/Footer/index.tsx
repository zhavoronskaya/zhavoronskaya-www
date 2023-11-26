import { SocialLinks } from "@/constants";
import {
  BandcampIcon,
  SoundcloudIcon,
  TelegramIcon,
} from "../../../icons/social";

type Props = {
  className?: string; // neobyazat
};

export default function Footer() {
  return (
    <div className="flex h-full w-full p-4 gap-4 text-sm justify-between overflow-hidden">
      <div className="flex gap-4 flex-shrink">
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
    </div>
  );
}
