import styles from "./Contact.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBandcamp,
  faTelegram,
  faInstagramSquare,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelopeOpen } from "@fortawesome/free-regular-svg-icons";
import IconContact from "../icons/iconHome/IconContact";

export default function Contact() {
  return (
    <div className="p20">
      <IconContact />
      <h1 className="py10">CONTACT ME</h1>

      <p className="py10">
        <FontAwesomeIcon icon={faEnvelopeOpen} height={"40px"} /> mail to
        zhavoronskaya.public@gmail.com
      </p>
      <br />
      <br />
      <br />
      <h2>IN SOCIAL</h2>
      <p className="py20">
        <a href="https://www.instagram.com/glslsketch/">
          <FontAwesomeIcon icon={faInstagramSquare} height={"40px"} /> instagram
        </a>
      </p>
      <p>
        <a href="https://t.me/zhavoronoki/">
          <FontAwesomeIcon icon={faTelegram} height={"40px"} /> t me
        </a>
      </p>
      <p className="py20">
        <a href="https://zhavoronskaya.bandcamp.com/">
          <FontAwesomeIcon icon={faBandcamp} height={"40px"} /> merch and
          support
        </a>
      </p>
    </div>
  );
}
