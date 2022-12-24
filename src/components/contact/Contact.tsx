import styles from "./Contact.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBandcamp,
  faTelegram,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelopeOpen } from "@fortawesome/free-regular-svg-icons";
import IconContact from "../icons/iconHome/IconContact";

export default function Contact() {
  return (
    <div className="p20">
      <IconContact />
      <h2>Contact me</h2>
      <p>
        <FontAwesomeIcon icon={faEnvelopeOpen} height={"40px"} /> mail me
        zhavoronskaya.public@gmail.com
      </p>
      <p>
        <a href="https://www.instagram.com/glslsketch/">
          <FontAwesomeIcon icon={faInstagram} height={"40px"} /> instagram
        </a>
      </p>
      <p>
        <a href="https://t.me/zhavoronoki/">
          <FontAwesomeIcon icon={faTelegram} height={"40px"} /> t me
        </a>
      </p>
      <p>
        <a href="https://zhavoronskaya.bandcamp.com/">
          <FontAwesomeIcon icon={faBandcamp} height={"40px"} /> merch and
          support
        </a>
      </p>
    </div>
  );
}
