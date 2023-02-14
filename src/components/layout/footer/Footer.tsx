import { SocialLinks } from "@/constants";
import {
  BandcampIcon,
  SoundcloudIcon,
  TelegramIcon,
} from "../../theme/Icon/SocialIcons";
import styles from "./Footer.module.css";

type Props = {
  className?: string; // neobyazat
};

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.social}>
        <a href={SocialLinks.TELEGRAM}>
          <TelegramIcon size="25px" />
        </a>
        <a href={SocialLinks.BANDCAMP}>
          <BandcampIcon size="25px" />
        </a>
        <a href={SocialLinks.SOUNDCLOUD}>
          <SoundcloudIcon size="25px" />
        </a>
      </div>
    </div>
  );
}
