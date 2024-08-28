import reality from "./data";
import { AlbumPageLayoutDetailed } from "@/modules/albums/components/AlbumPageLayout";

type Props = {};

const Reality = ({}: Props) => {
  return (
    <AlbumPageLayoutDetailed album={reality}>
      It's like losing grasp of reality and the boundaries of the present, with
      an industrial sound that envelops the listener in a sensation of being
      lost
    </AlbumPageLayoutDetailed>
  );
};

export default Reality;
