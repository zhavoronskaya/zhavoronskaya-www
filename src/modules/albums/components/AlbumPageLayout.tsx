import { IAlbum } from "@/interfaces";
import AlbumHeader from "./AlbumHeader";
import TagsList from "@/components/TagsList";
import ImageSlider from "@/components/ImageSlider";
import { NotesMusic } from "@/components/UI/decor";
import { AlbumSvgAnimation } from "@/components/SvgAnimation";
import FadingText from "@/components/FadingText";

type Props = {
  album: IAlbum;
  children: React.ReactNode;
};

const AlbumPageLayout = ({ album, children }: Props) => {
  return (
    <div className="px-8">
      <AlbumHeader />

      <div className="mt-36 lg:mt-32">
        <FadingText className="subtitle text-hsm sm:text-hst lg:text-hs font-medium">
          {album.name}
        </FadingText>
        <span className="block text-remarkm sm:text-remarkt lg:text-remark text-dissolve-color mt-2 sm:mt-4">
          {album.label}
        </span>
      </div>

      <div className="">{children}</div>
    </div>
  );
};

type AlbumPageLayoutDetailedProps = {
  album: IAlbum;
  children: React.ReactNode;
};

export const AlbumPageLayoutDetailed = ({
  album,
  children,
}: AlbumPageLayoutDetailedProps) => {
  return (
    <AlbumPageLayout album={album}>
      <AlbumSvgAnimation />
      <div className="sm:grid sm:grid-cols-12 relative">
        <div className="album-notes absolute left-[72%] top-[-36%] sm:left-[86%] sm:top-[-24%] lg:left-[80%] lg:top-[-20%] pointer-events-none z-20">
          <NotesMusic className="w-[96px] sm:w-[120px] lg:w-[160px] xl:w-[180px]" />
        </div>
        <div className="mt-8 sm:mt-16 lg:mt-24 sm:col-start-1 sm:col-span-6">
          <div className="h-full flex flex-col gap-4 justify-between">
            <p className="text-bodysm sm:text-bodyst lg:text-bodys">
              {children}
            </p>
            <div className="sm:pb-4">
              <TagsList tags={album.tags} height={32} />
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-16 lg:mt-24 sm:col-start-8 sm:col-span-5 ">
          <ImageSlider images={album.images} />
        </div>

        <div className="mt-12 sm:mt-10 lg:mt-8 mb-8 sm:col-start-1 sm:col-span-6 text-linkm sm:text-link text-dissolve-color">
          <p>
            Mastered by {album.info.mastered}, artwork by {album.info.artwork}
          </p>
          <p>
            Released on{" "}
            <a
              href={album.info.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-color hover:text-accent-color-active"
            >
              {album.info.released}
            </a>
          </p>
          <p>{album.info.date}</p>
        </div>
      </div>
    </AlbumPageLayout>
  );
};

export default AlbumPageLayout;
