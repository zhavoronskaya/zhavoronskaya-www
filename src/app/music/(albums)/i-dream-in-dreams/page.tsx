import dream from "./data";
import { AlbumPageLayoutDetailed } from "@/modules/albums/components/AlbumPageLayout";

type Props = {};

const Dream = ({}: Props) => {
  return (
    <AlbumPageLayoutDetailed album={dream}>
      Album explores the contrasts of sleep: the turmoil of nightmares and the
      peace of sweet dreams, experienced by the same person, alongside
      scientific insights into dream perception and brain function.
    </AlbumPageLayoutDetailed>
  );
};

export default Dream;
