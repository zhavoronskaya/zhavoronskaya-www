import GridGallery from "@/components/GridGallery";
import JumpingText from "@/components/JumpingText";
import { ShotsSvgAnimation } from "@/components/SvgAnimation";

import { BirdShot, HeartsShot } from "@/components/UI/decor";

type Props = {};

const ShotsPage = ({}: Props) => {
  return (
    <>
      <ShotsSvgAnimation />
      <div className="px-8 relative">
        <div className="shots-bird absolute right-[10%] top-4 sm:right-[14%] sm:top-24 lg:right-[14%] lg:top-36 z-20 pointer-events-none">
          <BirdShot className="w-[112px] sm:w-[244px] lg:w-[320px]" />
        </div>
        <div className="shots-heart absolute right-[14%] top-[98.6%]  sm:right-[14%] sm:top-[98%] lg:right-[14%] lg:top-[98.4%] z-20 pointer-events-none">
          <HeartsShot className="w-[144px] sm:w-[244px] lg:w-[320px]" />
        </div>
        <div className="title shots-section-1 mt-16 sm:mt-32">
          <JumpingText className="text-hxlm sm:text-hxlt lg:text-[176px]/[162px] xl:text-hxl font-bold uppercase ">
            Gallery
          </JumpingText>
          <JumpingText className="text-hxlm sm:text-hxlt lg:text-[176px]/[162px] xl:text-hxl font-bold uppercase ">
            of digital art
          </JumpingText>

          <span className="mt-4 sm:mt-8 lg:mt-12 block text-remarkm sm:text-remarkt lg:text-remark text-dissolve-color ">
            Where Code Meets Canvas: A Journey Through Generative Art
          </span>
        </div>

        <GridGallery />
      </div>
    </>
  );
};

export default ShotsPage;
