import { SocialLinks } from "@/constants";
import ImageLink from "@/components/ImageLink/ImageLink";
import Image from "next/image";
import previewAlbumsData from "./data";
import { BirdMusic, FlowerMusic } from "@/components/UI/decor";
import { MusicSvgAnimation } from "@/components/SvgAnimation";
import JumpingText from "@/components/JumpingText";

type Props = {};

const MusicPage = ({}: Props) => {
  return (
    <>
      <MusicSvgAnimation />
      <div className="px-8">
        <div className="mt-16 sm:mt-32 sm:grid sm:grid-cols-12 sm:gap-4">
          <div className="title sm:col-start-1 sm:col-span-7">
            <JumpingText className="text-hxlm sm:text-hxlt lg:text-[176px]/[162px] xl:text-hxl font-bold uppercase">
              Music
            </JumpingText>

            <div className="mt-44 md:mt-36 lg:mt-32 relative">
              <div className="music-flower absolute left-[28%] bottom-[0%] sm:left-[44%] sm:top-[-100%] lg:left-[60%] lg:top-[-100%] pointer-events-none z-20">
                <FlowerMusic className="w-[220px] sm:w-[380px] lg:w-[420px] xl:w-[540px]" />
              </div>
              <div>
                <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
                  discography
                </span>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={SocialLinks.BANDCAMP}
                  className="block text-accent-color uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm hover:text-accent-color-active font-medium"
                >
                  bandcamp
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={SocialLinks.SOUNDCLOUD}
                  className="block text-accent-color uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm hover:text-accent-color-active font-medium"
                >
                  soundcloud
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={SocialLinks.DISCOGS}
                  className="block text-accent-color uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm hover:text-accent-color-active font-medium"
                >
                  discogs
                </a>
              </div>
            </div>

            <div className="sm:hidden relative mt-8 sm:mt-0">
              <div className="absolute h-36 inset-x-[-16px] ">
                <Image
                  width="865"
                  height="1280"
                  alt=""
                  className="object-cover block h-full w-full sm:rounded-lg border border-border-image-color"
                  src="/image/profile.webp"
                  priority={true}
                />
              </div>
            </div>

            <div className="mt-48 sm:mt-24 lg:mt-12 ">
              <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
                bio
              </span>
              <p className="text-bodysm sm:text-bodyst lg:text-bodys">
                Starting in Kyiv in 2017, project initially focused on an
                anti-war theme, evolving to explore broader human emotions
                through experimental albums that blend sound with deep thematic
                exploration. Today, I explore the fusion of music, visual art,
                and technology. I&#39;m particularly drawn to generative art, as
                an opportunity to work with new languages and algorithms, as
                well as to blend the knowledge of a programmer and musical
                creativity.
              </p>
            </div>
          </div>
          <div className="hidden sm:block sm:relative sm:col-start-9 sm:col-span-4 ">
            <div className="sm:absolute h-full sm:pb-12 sm:mr-[-32px] sm:rounded-lg sm:overflow-hidden">
              <Image
                width="865"
                height="1280"
                alt=""
                className="object-cover block h-full w-full sm:rounded-lg border border-border-image-color"
                src="/image/profile.webp"
                priority={true}
              />
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 lg:mt-36 sm:grid sm:grid-cols-12 sm:gap-4">
          <div className="sm:mt-36 sm:col-start-1 sm:col-span-4 relative">
            <div>
              <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
                2017-2021
              </span>
              <p className="text-hxxsm sm:text-hxxst lg:text-hxxs font-medium">
                some selected works
              </p>
            </div>
            <div className="music-bird absolute left-[-16%] top-[16%] sm:left-[-46%] sm:top-[4%] lg:left-[-56%] lg:top-[-2%] xl:left-[-46%] xl:top-[-6%] pointer-events-none z-20">
              <BirdMusic className="w-[220px] sm:w-[400px] lg:w-[580px] xl:w-[780px]" />
            </div>
          </div>
          <div className="mt-24 mb-8 sm:mt-0 sm:col-start-5 sm:col-span-8">
            <div className="flex gap-2 sm:gap-4">
              <div className="flex flex-col pt-8 gap-2 sm:gap-4 lg:pt-16">
                <ImageLink
                  href="/music/gone-beyond"
                  image={previewAlbumsData[0]}
                />
                <ImageLink href="/music/reality" image={previewAlbumsData[1]} />
              </div>

              <div className="flex flex-col gap-2 sm:gap-4">
                <ImageLink
                  href="/music/twilight-crystal"
                  image={previewAlbumsData[2]}
                />
                <ImageLink
                  href="/music/i-dream-in-dreams"
                  image={previewAlbumsData[3]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicPage;
