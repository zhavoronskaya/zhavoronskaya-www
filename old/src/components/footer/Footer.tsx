import {
  BandcampIcon,
  SoundcloudIcon,
  TelegramIcon,
} from "../icons/SocialIcons";
import styles from "./Footer.module.css";

type Props = {
  className?: string; // neobyazat
};

export default function Footer() {
  return (
    <div className={styles.icons}>
      <a href="https://soundcloud.com/zhavoronskaya">
        <SoundcloudIcon size="25px" />
      </a>
      <a href="https://t.me/zhavoronoki">
        <TelegramIcon size="25px" />
      </a>
      <a href="https://zhavoronskaya.bandcamp.com/">
        <BandcampIcon size="25px" />
      </a>
    </div>
  );
}
