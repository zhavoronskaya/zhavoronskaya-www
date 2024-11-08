import moon from "./data";
import { AlbumPageLayoutDetailed } from "@/modules/albums/components/AlbumPageLayout";

type Props = {};

const GoneBeyond = ({}: Props) => {
  return (
    <AlbumPageLayoutDetailed album={moon}>
      Re-released EP &#39;Gone Beyond &#39; explores personal ties to the marine
      world, while another album is dedicated to the Arab world, incorporating
      sounds from conflicts in Syria, Iraq, and Chechnya with diverse string
      instruments and field recordings.
    </AlbumPageLayoutDetailed>
  );
};

export default GoneBeyond;
