import { IAlbum } from "@/interfaces";
import LogoSideBarScene from "@/theme/components/LogoSideBar";
import BaseLayout from "@/theme/components/BaseLayout";
import AlbumsHeader from "./AlbumHeader";

type Props = {
  album: IAlbum;
  nextAlbumSlug?: string;
  prevAlbumSlug?: string;
  children: React.ReactNode;
};

export default function AlbumPageLayout(props: Props) {
  return (
    <BaseLayout
      sidebar={<LogoSideBarScene />}
      contentMaxWidth="700px"
      contentHeader={<AlbumsHeader albumName={props.album.name} />}
    >
      <img src={props.album.cover} alt="Album" />

      <div dangerouslySetInnerHTML={{ __html: props.album.bandcamp }} />

      <div className="mt-lg">{props.children}</div>

      <p className="mt-sm pb-lg op-04 fz-sm">{props.album.genre}</p>
    </BaseLayout>
  );
}
