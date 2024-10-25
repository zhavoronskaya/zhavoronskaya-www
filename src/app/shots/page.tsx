import GridGallery from "@/components/GridGallery";

import { BirdShot } from "@/components/UI/decor";

type Props = {};

const ShotsPage = ({}: Props) => {
  return (
    <div className="px-8 relative">
      <div className="mt-16 sm:mt-32">
        <h1 className="text-hxlm sm:text-hxlt lg:text-hxl font-bold uppercase ">
          Gallery <br /> of digital art
        </h1>

        <span className="mt-4 sm:mt-8 lg:mt-12 block text-remarkm sm:text-remarkt lg:text-remark text-dissolve-color ">
          Where Code Meets Canvas: A Journey Through Generative Art
        </span>
      </div>
      <div className="absolute right-16 top-[4%]">
        <BirdShot size={222} />
      </div>
      <GridGallery />
    </div>
  );
};

export default ShotsPage;
