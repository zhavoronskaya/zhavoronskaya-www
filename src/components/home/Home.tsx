import styles from "./Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Home() {
  return (
    <>
      <h2 className="p20">Albums</h2>
      <div className={styles.albumscontainer}>
        <img src="/albums/dreams.png" alt="Album" />
        <img src="/albums/crystal.png" alt="Album" />
        <img src="/albums/whitehalf.png" alt="Album" />
        <img src="/albums/cxema.png" alt="Album" />
        <img src="/albums/reality.png" alt="Album" />
        <img src="/albums/pcp.png" alt="Album" />
      </div>
      <h2 className="p20">Art</h2>
      <div className={styles.artcontainer}>
        <img src="/art/4.png" alt="Art" />
        <img src="/art/5.png" alt="Art" />
        <img src="/art/6.png" alt="Art" />
        <img src="/art/2.png" alt="Art" />
        <img src="/art/1.png" alt="Art" />
        <img src="/art/3.png" alt="Art" />
        <img src="/art/7.png" alt="Art" />
      </div>

      <div className={styles.connect + " " + "p20"}>
        <h2>Connect</h2>
        <a href="https://t.me/zhavoronoki/">
          <FontAwesomeIcon icon={faTelegram} height={"10px"} /> t me
        </a>
      </div>
    </>
  );
}
