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
      <IconHome />
      <h1 className="py10">CONTACT ME</h1>

      <p className="py10">
        <EmailIcon /> mail to zhavoronskaya.public@gmail.com
      </p>
      <br />
      <br />
      <br />
      <h2>IN SOCIAL</h2>
      <p className="py20">
        <a href="https://www.instagram.com/glslsketch/">
          <InstagramIcon /> instagram
        </a>
      </p>
      <p>
        <a href="https://t.me/zhavoronoki/">
          <TelegramIcon /> t me
        </a>
      </p>
      <p className="py20">
        <a href="https://zhavoronskaya.bandcamp.com/">
          <BandcampIcon /> merch and support
        </a>
      </p>
    </div>
  );
}
