import { IShotData } from "@/interfaces";
import ShotHeader from "./ShotHeader";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import TagsList from "@/components/TagsList";
import { Heart } from "@/components/UI/icons";
import ShotImageSlider from "@/components/ShotImageSlider";

type Props = {
  shot: IShotData;
  children: React.ReactNode;
};
const ShotPageLayout = ({ shot, children }: Props) => {
  return (
    <div className="px-8">
      <ShotHeader />
      <div className="mt-36 sm:mt-20 lg:mt-24">
        <h2 className=" text-hlm sm:text-hlt lg:text-hl font-medium uppercase">
          {shot.name}
        </h2>
      </div>

      <div className="">{children}</div>
    </div>
  );
};

type ShotPageLayoutDetailedProps = {
  shot: IShotData;
  children: React.ReactNode;
  id: string;
};
export const ShotPageLayoutDetailed = ({
  shot,
  children,
  id,
}: ShotPageLayoutDetailedProps) => {
  return (
    <ShotPageLayout shot={shot}>
      <div className="sm:grid sm:grid-cols-12 gap-4 z-[41]">
        <div className="mt-16 sm:mt-10 lg:mt-20 sm:col-start-1 sm:col-span-6">
          <p className="text-bodysm sm:text-bodyst lg:text-bodys">{children}</p>
        </div>

        <div className="mt-16 sm:mt-10 lg:mt-20 sm:col-start-8 sm:col-span-5">
          <ShotImageSlider images={shot.images} />
        </div>

        <div className="mt-8 sm:mt-16 lg:mt-24 sm:col-start-1 sm:col-span-6">
          <div className="h-full flex flex-col gap-4 justify-between">
            <div>
              <span className="block text-remarkm sm:text-remarkt lg:text-remark text-dissolve-color">
                useful links
              </span>
              <span className="block text-pillsmm sm:text-pillsmt lg:text-pillsm font-medium uppercase pb-2 sm:pb-4">
                Inspiration & Resources
              </span>

              <ul className="list-none text-bodysm sm:text-bodyst lg:text-bodys mt-2">
                {shot.ref.map((ref, i) => (
                  <li key={i} className="flex gap-2 mb-2 sm:mb-4 items-center">
                    <Heart className="w-[24px] sm:w-[28px] lg:w-[32px] shrink-0" />
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={ref.src}
                      className="block text-accent-color text-hintm sm:text-hintt lg:text-hint hover:text-accent-color-active font-medium"
                    >
                      {ref.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-16 lg:mt-24 sm:col-start-7 sm:col-span-6"></div>

        <div className="sm:pb-4 sm:col-start-8 sm:col-span-5">
          <div className="flex justify-end">
            {" "}
            <Link
              href={ROUTES.SHOT_VIEW_PAGE(id)}
              className="block text-accent-color text-pillm sm:text-pillt lg:text-pill hover:text-accent-color-active font-medium"
            >
              view shot
            </Link>
          </div>
        </div>

        <div className="mt-6 mb-6">
          <TagsList tags={shot.tags} height={32} />
        </div>
      </div>
    </ShotPageLayout>
  );
};

export default ShotPageLayout;
