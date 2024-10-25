import BaseLayout from "@/components/BaseLayout/BaseLayout";
import { SocialLinks } from "@/constants";
import ImageLink from "@/components/ImageLink/ImageLink";
import Image from "next/image";
import previewAlbumsData from "./data";

type Props = {};

const MusicPage = ({}: Props) => {
  return (
    <BaseLayout>
      <div className="px-8">
        <div className="mt-16 sm:mt-32 sm:grid sm:grid-cols-12 sm:gap-4">
          <div className="sm:col-start-1 sm:col-span-7">
            <h1 className="text-hxlm sm:text-hxlt lg:text-hxl font-bold uppercase">
              Music
            </h1>

            <div className="mt-44 md:mt-36 lg:mt-32">
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

            <div className="sm:hidden relative mt-8 sm:mt-0">
              <div className="absolute h-36 inset-x-[-16px] ">
                <Image
                  width="865"
                  height="1280"
                  alt=""
                  className="object-cover block h-full w-full sm:rounded-lg border border-border-image-color"
                  src="/image/profile.webp"
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
              />
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 lg:mt-36 sm:grid sm:grid-cols-12 sm:gap-4">
          <div className="sm:mt-36 sm:col-start-1 sm:col-span-4">
            <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
              2017-2021
            </span>
            <p className="text-hxxsm sm:text-hxxst lg:text-hxxs font-medium">
              some selected works
            </p>
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
    </BaseLayout>
  );
};

export default MusicPage;
