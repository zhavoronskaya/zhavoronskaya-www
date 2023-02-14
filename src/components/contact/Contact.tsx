import styles from "./Contact.module.css";

import IconHome from "../theme/Icon/iconHome/IconHome";
import {
  BandcampIcon,
  EmailIcon,
  InstagramIcon,
  TelegramIcon,
} from "../theme/Icon/SocialIcons";
import { SocialLinks } from "@/constants";

export default function Contact() {
  return (
    <div>
      <h2>CONTACT ME</h2>
      <p className="mb-lg">
        Have a project in mind or just wanna chat about something? Feel free to
        contact me via email or on any of social platforms I use:
      </p>

      <a
        className="g-sm mb-md items-center"
        href={`mailto:${SocialLinks.EMAIL}`}
      >
        <EmailIcon /> {SocialLinks.EMAIL}
      </a>

      <a className="g-sm mb-md items-center" href={SocialLinks.TELEGRAM}>
        <TelegramIcon /> telegram
      </a>

      <a className="g-sm mb-md items-center" href={SocialLinks.INSTAGRAM}>
        <InstagramIcon /> instagram
      </a>

      <a className="g-sm mb-md items-center" href={SocialLinks.BANDCAMP}>
        <BandcampIcon /> merch and support
      </a>

      <IconHome />
    </div>
  );
}
