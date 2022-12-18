import styles from './Footer.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSoundcloud,
  faBandcamp,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";

type Props = {
    className?: string; // neobyazat
}

export default function Footer() {
    return (
       <div className={styles.icons}> 
            <a href="https://soundcloud.com/zhavoronskaya">
            <FontAwesomeIcon icon={faSoundcloud} width={"40px"} />
          </a>
          <a href="https://t.me/zhavoronoki">
            <FontAwesomeIcon icon={faTelegram} width={"30px"} />
          </a>
          <a href="https://zhavoronskaya.bandcamp.com/">
            <FontAwesomeIcon icon={faBandcamp} width={"30px"} />
          </a>
       </div>
    )
}