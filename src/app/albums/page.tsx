import Link from "next/link";

import { SocialLinks } from "@/constants";
import { getAlbums } from "@/db";
import LogoSideBarScene from "@/theme/components/LogoSideBar";
import BaseLayout from "@/theme/components/BaseLayout";
import AlbumThumbnail from "@/components/albums/AlbumThumbnail";
import {
  BandcampIcon,
  SoundcloudIcon,
} from "@/components/theme/Icon/SocialIcons";

import styles from "./page.module.css";

export default async function AlbumsPage() {
  const albums = await getAlbums();

  return (
    <BaseLayout
      contentMaxWidth="700px"
      sidebar={<LogoSideBarScene />}
      contentHeader={
        <h2 className="text-ellipsis">Selected works (2017-2021)</h2>
      }
    >
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

      <div className={styles.albumscontainer}>
        {albums.map((album) => {
          return <AlbumThumbnail key={album.name} album={album} />;
        })}
      </div>
    </BaseLayout>
  );
}
