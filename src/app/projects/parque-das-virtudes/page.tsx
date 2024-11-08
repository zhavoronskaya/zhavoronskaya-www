import Image from "next/image";

import virtudes from "./data";
import ProjectPageLayout from "@/modules/projects/components/ProjectPageLayout";
import { ImageProjectAnimation } from "@/components/ImageProjectAnimation";

type Props = {};

const VirtudesProject = ({}: Props) => {
  return (
    <>
      <ProjectPageLayout project={virtudes}>
        <div className="gallery mt-8 sm:mt-12 lg:mt-20 sm:grid sm:grid-cols-12 sm:gap-4">
          <ImageProjectAnimation />
          <div className=" mb-4 sm:mb-0 :sm:col-start-1 sm:col-span-12 h-[224px] lg:h-[640px] sm:h-[512px]">
            <Image
              width="3012"
              height="1616"
              alt=""
              priority
              className="image image-1 object-cover w-full h-full rounded-lg border-border-image-color"
              src="/projects/virtudes/virtudes1.webp"
            />
          </div>
          <div className="mb-4 sm:mb-0 sm:col-start-1 sm:col-span-7 h-[224px] lg:h-[528px] sm:h-[288px]">
            <Image
              width="3012"
              height="1616"
              alt=""
              priority
              className="image-2 object-cover w-full h-full rounded-lg border-border-image-color translate-x-[-50px]"
              src="/projects/virtudes/virtudes2.webp"
            />
          </div>
          <div className=" sm:col-start-8 sm:col-span-5 h-[224px] lg:h-[528px] sm:h-[288px]">
            <Image
              width="1648"
              height="2198"
              alt=""
              priority
              className="image-3 object-cover w-full h-full rounded-lg border-border-image-color translate-x-[50px]"
              src="/projects/virtudes/virtudes3.webp"
            />
          </div>
        </div>
      </ProjectPageLayout>
    </>
  );
};

export default VirtudesProject;
