import { SocialLinks } from "@/constants";
import Image from "next/image";
import React from "react";
import {
  BandcampIcon,
  InstagramIcon,
  SoundcloudIcon,
  TelegramIcon,
} from "../icons/SocialIcons";
import styles from "./Cv.module.css";

export default function Cv() {
  return (
    <div>
      <div className="items-center fxw-w g-md mb-lg">
        <Image
          width={100}
          height={100}
          src="/image/profphoto.png"
          alt="Avatar"
          className="w-a bdrs-round"
        />
        <div className="fx-1">
          <h2 className="fz-xl lh-1">Elena Zhavoronskaya</h2>
          <p className="op-04 fz-sm">Musician & Digital Atrist</p>
        </div>
      </div>

      <Section title="About me">
        <p>
          I'm a musician and a digital artist based in Porto, Portugal. I
          specialize in and truly enjoy creating conceptual experimental
          electronic, cross-genre sound (field recording, jazz, ambient, etc.)
          and digital arts using web technologies like WebGL, GLSL, Three.js.
          I'm always open to learning new things and experiment.
        </p>
      </Section>

      <Section title="Music">
        <p className="mb-md">
          You can find my detailed discography on{" "}
          <a href={SocialLinks.DISCOGS}>Discogs</a>
          {", "}
          <a href={SocialLinks.BANDCAMP}>Bandcamp</a>
          {" and "}
          <a href={SocialLinks.SOUNDCLOUD}>Soundcloud</a>.
        </p>

        <p className="mb-sm">
          My music works has been released on various labels with the help of
          many beautiful people.
        </p>
        <ul className="mb-md mt-0 pl-lg">
          <li>
            <a href="http://killego.bandcamp.com">KILL EGO FAMILY</a> listen on{" "}
            <a href="http://mixcloud.com/killego/2020-kllgmx023-voidctzen-tapesloopsreflections-mix">
              mixcloud
            </a>
          </li>
          <li>
            <a href="http://begushchijchelovek.bandcamp.com/album/016-zhavoronskaya">
              split CXEMA PYXY PO KOLY/ZHAVORONSKAYA [BCH016]
            </a>
          </li>
          <li>
            <a href="http://takoe.bandcamp.com/album/zhavoronskaya-i-dream-in-dreams-tak017e">
              I dream in dreams [TAK017E]
            </a>
          </li>
          <li>
            <a href="http://takoe.bandcamp.com/album/zhavoronskaya-r-tak004e">
              R [TAK004E]
            </a>
          </li>
          <li>
            <a href="http://naughtynightrecords.bandcamp.com/album/t-w-i-l-i-g-h-t-c-r-y-s-t-a-l">
              twilight crystal [NAUGHTY NIGHT RECORDS]
            </a>
          </li>
        </ul>

        <p className="mb-sm">
          Also I had a plasure to play live on some events:
        </p>
        <ul className="mb-md mt-0 pl-lg">
          <li>
            <a href="http://www.facebook.com/events/637499056701108/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22page%22%7D]%7D">
              Osnova Kyiv
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/snakes808/">Snakes Kyiv</a>
          </li>
          <li>
            <a href="http://www.20ftradio.net/events/2019/4/25/osnova-kyiv-w-zhavoronskaya">
              20ft Radio Kyiv
            </a>{" "}
            watch on <a href="http://youtu.be/ueJSy5WJhnE"> Youtube</a>
          </li>
          <li>
            <a href="http://www.facebook.com/events/915269409319172?acontext=%7B%22source%22%3A%223%22%2C%22action_history%22%3A%22null%22%7D&aref=3">
              Symphonic Silence Inside NOISEROOM (Sound Museum)
            </a>
          </li>
        </ul>
      </Section>

      <Section title="Code">
        <p>
          I'm a musician and a digital artist based in Porto, Portugal. I
          specialize in and truly enjoy creating conceptual experimental
          electronic, cross-genre sound (field recording, jazz, ambient, etc.)
          and digital arts using web technologies like WebGL, GLSL, Three.js.
          I'm always open to learning new things and experiment.
        </p>
      </Section>

      <Section title="Education">
        <h4 className="md-sm">
          National Research Nuclear University MEPHI, Moscow, Russia
        </h4>
        {/* www.mephi.ru */}
        <ul className="mb-md mt-0 pl-lg">
          <li>
            <b>Jul 2015</b> Bachelor of Science in Human and Environmental
            Safety
          </li>
          <li>
            <b>Jul 2017</b> Masters in Human and Environmental Safety
          </li>
        </ul>
      </Section>
    </div>
  );
}

function SideBarCv() {
  return (
    <div className={styles.cvside}>
      <h3 className="py10">SOCIAL</h3>
      <p className="py10">
        <a href="https://www.instagram.com/glslsketch/">
          <InstagramIcon /> instagram
        </a>
      </p>
      <h3 className="py10">CONTACT</h3>
      <p className="py10">
        <a href="https://t.me/zhavoronoki/">
          <TelegramIcon /> t me
        </a>
      </p>
    </div>
  );
}

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="mb-lg">
      <h3 className="fz-lg">{title}</h3>
      {children}
    </section>
  );
};
