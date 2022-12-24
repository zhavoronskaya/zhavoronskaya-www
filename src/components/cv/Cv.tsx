import styles from "./Cv.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSoundcloud,
  faBandcamp,
  faTelegram,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function SideBarCv() {
  return (
    <div className={styles.cvside}>
      <h2>Social</h2>
      <p>
        <a href="https://www.instagram.com/glslsketch/">
          <FontAwesomeIcon icon={faInstagram} height={"10px"} /> instagram
        </a>
      </p>
      <h2>Contact</h2>
      <p>
        <a href="https://t.me/zhavoronoki/">
          <FontAwesomeIcon icon={faTelegram} height={"10px"} /> t me
        </a>
      </p>
    </div>
  );
}

export default function Cv() {
  return (
    <div className={styles.cvflex}>
      <div className={styles.sidebar + " " + "p20"}>
        <img className={styles.cvimg} src="/image/cvphoto.png" alt="cvphoto" />
        <SideBarCv />
      </div>
      <div className={styles.content + " " + "p20"}>
        <h2 className={styles.discription}>
          Conceptual experimental electronic artist with cross-genre records and
          generative art-works
        </h2>

        <div className={styles.text}>
          <h2>SOUND</h2>
          <p>
            <a href="https://zhavoronskaya.bandcamp.com/">
              <FontAwesomeIcon icon={faBandcamp} height={"10px"} /> Bandcamp
            </a>
            <br />
            <a href="https://soundcloud.com/zhavoronskaya">
              <FontAwesomeIcon icon={faSoundcloud} height={"10px"} /> Soundcloud
            </a>
          </p>
          <h2>LABELS</h2>
          <p>
            <a href="http://killego.bandcamp.com"> ■ KILL EGO FAMILY</a> listen
            on{" "}
            <a href="http://mixcloud.com/killego/2020-kllgmx023-voidctzen-tapesloopsreflections-mix">
              mixcloud
            </a>
            <br />
            <a href="http://begushchijchelovek.bandcamp.com/album/016-zhavoronskaya">
              ■ split CXEMA PYXY PO KOLY/ZHAVORONSKAYA [BCH016]
            </a>
            <br />
            <a href="http://takoe.bandcamp.com/album/zhavoronskaya-i-dream-in-dreams-tak017e">
              ■ I dream in dreams [TAK017E]
            </a>
            <br />
            <a href="http://takoe.bandcamp.com/album/zhavoronskaya-r-tak004e">
              ■ R [TAK004E]
            </a>
            <br />
            <a href="http://naughtynightrecords.bandcamp.com/album/t-w-i-l-i-g-h-t-c-r-y-s-t-a-l">
              ■ twilight crystal [NAUGHTY NIGHT RECORDS]
            </a>
          </p>
          <h2>DISCOGRAPHY</h2>
          <p>
            <a href="http://discogs.com/ru/artist/6992688-Zhavoronskaya">
              Watch Discogs
            </a>
          </p>
          <h2>LIVE</h2>
          <p>
            <a href="http://www.facebook.com/events/637499056701108/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22page%22%7D]%7D">
              ■ Osnova Kyiv
            </a>
            <br />
            <a href="https://www.facebook.com/snakes808/">■ Snakes Kyiv</a>
            <br />
            <a href="http://www.20ftradio.net/events/2019/4/25/osnova-kyiv-w-zhavoronskaya">
              ■ 20ft Radio Kyiv
            </a>{" "}
            watch on <a href="http://youtu.be/ueJSy5WJhnE"> Youtube</a>
            <br />
            <a href="http://www.facebook.com/events/915269409319172?acontext=%7B%22source%22%3A%223%22%2C%22action_history%22%3A%22null%22%7D&aref=3">
              ■ Symphonic Silence Inside NOISEROOM (Sound Museum)
            </a>
          </p>
          <h2>VIDEO</h2>
          <p>
            <a href="http://youtube.com/results?search_query=zhavoronskaya">
              Youtube
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
