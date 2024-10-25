import { SocialLinks } from "@/constants";
import Link from "next/link";

type Props = {};

const AlbumHeader = ({}: Props) => {
  return (
    <div className="flex justify-between mt-6 sm:mt-12">
      <Link
        href="/music"
        className=" block text-accent-color uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm hover:text-accent-color-active font-medium"
      >
        Music
      </Link>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={SocialLinks.BANDCAMP}
        className="block text-accent-color text-pillsmm sm:text-pillsmt lg:text-pillsm hover:text-accent-color-active font-medium"
      >
        bandcamp
      </a>
    </div>
  );
};

export default AlbumHeader;
