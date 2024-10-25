import { IProject } from "@/interfaces";
import Link from "next/link";
import Image from "next/image";
import { Video } from "@/components/GridGallery";

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
      <div className="sm:grid sm:grid-cols-12">
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
      <div className="sm:grid sm:grid-cols-12">
        <div className="sm:col-start-9 sm:col-span-4 mt-8  mb-24 sm:mb-20">
          <Link
            href={project.routing}
            className=" block text-accent-color uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm hover:text-accent-color-active font-medium"
          >
            view project
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProjectThumbnail;
