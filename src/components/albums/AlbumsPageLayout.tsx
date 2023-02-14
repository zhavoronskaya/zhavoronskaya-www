import Link from "next/link";
import styles from "./AlbumsPageLayout.module.css";
import { LayoutWithSidebar } from "../layout/Layout";
import { BandcampIcon, SoundcloudIcon } from "../theme/Icon/SocialIcons";
import { SocialLinks } from "@/constants";

type Props = {
  children: React.ReactNode;
};

export default function AlbumsPageLayout(props: Props) {
  return (
    <LayoutWithSidebar contentHeader={<Header />}>
      <Intro />

      <div className={styles.albumscontainer}>{props.children}</div>
    </LayoutWithSidebar>
  );
}

const Header = () => {
  return (
    <h2 className="text-ellipsis">
      Gallery of selected music works since 2017-2021
    </h2>
  );
};

const Intro = () => {
  return (
    <div className="mb-lg">
      <p>
        Here is the small list of my music releases. To see more feel free to
        visit other social media platforms. Have a nice travelling! 🥰
      </p>

      <div className="my-sm">
        <Link className="g-sm items-center" href={SocialLinks.BANDCAMP}>
          <BandcampIcon /> Bandcamp
        </Link>

        <Link className="g-sm items-center" href={SocialLinks.SOUNDCLOUD}>
          <SoundcloudIcon /> SoundCloud
        </Link>
      </div>
    </div>
  );
};
