import { IProject } from "@/interfaces";

import Image from "next/image";
import { Video } from "@/components/GridGallery";
import { MicroHeartProject } from "@/components/UI/decor";
import Link from "next/link";
import TransitionLink from "@/components/TransitionLink";

type Props = {
  project: IProject;
};

const ProjectThumbnail = ({ project }: Props) => {
  return (
    <>
      <div className="w-full mt-12 sm:mt-20 lg:mt-24 ">
        {/* <Image
          width={project.thumbnailSize.width}
          height={project.thumbnailSize.height}
          alt=""
          className="block object-cover w-full h-full rounded-lg border-border-image-color"
          src={project.thumbnailImg}
        /> */}
        <div className="relative overflow-hidden rounded-xl border border-border-dissolve-color">
          <Video>
            <source src={project.thumbnailVideoUrl} type="video/mp4" />
          </Video>
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-12 ">
        <div className="sm:col-start-1 sm:col-span-8">
          <h4 className="mt-4 sm:mt-8 text-hsm sm:text-hst lg:text-hs font-medium ">
            {project.name[0]}
            <span className="text-dissolve-color">{project.separator}</span>
            {project.name[1]}
          </h4>
          <span className="block text-remarkm sm:text-remarkt lg:text-remark text-dissolve-color mt-2">
            {project.thumbnailDIscription}
          </span>
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-12 relative">
        <div className="sm:col-start-9 sm:col-span-4 mt-8  mb-24 sm:mb-20 ">
          <TransitionLink
            href={project.routing}
            className=" block text-accent-color uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm hover:text-accent-color-active font-medium"
          >
            view project
          </TransitionLink>
        </div>
        <div className="projects-heart opacity-0 absolute right-0 bottom-[0%] sm:left-[59%] sm:top-[14%] lg:left-[58%] lg:bottom-[16%] pointer-events-none">
          <MicroHeartProject className="w-[24px] sm:w-[48px] lg:w-[64px]" />
        </div>
      </div>
    </>
  );
};

export default ProjectThumbnail;
