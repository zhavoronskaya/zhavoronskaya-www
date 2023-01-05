import { IAlbum } from "../../interfaces";
import Layout from "../layout/Layout";

type Props = {
  album: IAlbum;
};

export default function AlbumPageLayout(props: Props) {
  return (
    <Layout>
      <h2>{props.album.name}</h2>
      <div dangerouslySetInnerHTML={{ __html: props.album.bandcamp }} />
      <p>{props.album.description}</p>
    </Layout>
  );
}
