import { IAlbum } from "@/interfaces";
import LogoSideBarScene from "@/components/scenes/ZhavoronskayaPlaneVertical";
import BaseLayout from "@/theme/components/LayoutBaseV0";
import AlbumsHeader from "./AlbumHeader";

type Props = {
  album: IAlbum;
  nextAlbumSlug?: string;
  prevAlbumSlug?: string;
  children: React.ReactNode;
};

export default function AlbumPageLayout(props: Props) {
  return (
    <>
      <div className="fixed top-4 fz-lg">
        <AlbumsHeader albumName={props.album.name} />
      </div>

      <img src={props.album.cover} alt="Album" />

      <div dangerouslySetInnerHTML={{ __html: props.album.bandcamp }} />

      <div className="mt-lg">{props.children}</div>

      <p className="mt-sm pb-lg op-04 fz-sm">{props.album.genre}</p>
    </>
  );
}
