import styles from "./Contact.module.css";

import IconHome from "../icons/iconHome/IconHome";
import {
  BandcampIcon,
  EmailIcon,
  InstagramIcon,
  TelegramIcon,
} from "../icons/SocialIcons";

export default function Contact() {
  return (
    <div>
      <h1>CONTACT ME</h1>
      <p className="mb-lg">
        Have a project in mind or just wanna chat about something? Feel free to
        contact me via email or on any of social platforms I use:
      </p>

      <a
        className="g-sm mb-md items-center"
        href="mailto:zhavoronskaya.public@gmail.com"
      >
        <EmailIcon /> zhavoronskaya.public@gmail.com
      </a>

      <a
        className="g-sm mb-md items-center"
        href="https://www.instagram.com/glslsketch/"
      >
        <InstagramIcon /> instagram
      </a>

      <a className="g-sm mb-md items-center" href="https://t.me/zhavoronoki/">
        <TelegramIcon /> telegram
      </a>

      <a
        className="g-sm mb-md items-center"
        href="https://zhavoronskaya.bandcamp.com/"
      >
        <BandcampIcon /> merch and support
      </a>

      <IconHome />
    </div>
  );
}
