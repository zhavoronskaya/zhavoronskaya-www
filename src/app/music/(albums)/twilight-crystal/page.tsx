import crystal from "./data";
import { AlbumPageLayoutDetailed } from "@/modules/albums/components/AlbumPageLayout";

type Props = {};

const Crystal = ({}: Props) => {
  return (
    <AlbumPageLayoutDetailed album={crystal}>
      The sound of this release stands out for its lightness and nostalgic
      tones, crafted using saxophone and samples from rare vintage records.
    </AlbumPageLayoutDetailed>
  );
};

export default Crystal;
