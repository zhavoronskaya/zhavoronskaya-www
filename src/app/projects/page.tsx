import { TechnologyLinks } from "@/constants";
import virtudes from "./parque-das-virtudes/data";
import cityscape from "./cityscape-showcase/data";
import ProjectThumbnail from "@/modules/projects/components/ProjectThumbnail";
import { FlowerProject } from "@/components/UI/decor";
import { ProjectsSvgAnimation } from "@/components/SvgAnimation";
import JumpingText from "@/components/JumpingText";

type Props = {};

const ProjectsPage = ({}: Props) => {
  return (
    <div className="px-8 relative">
      <ProjectsSvgAnimation />
      <div className="projects-flower absolute right-2 top-[0%]  sm:right-2 sm:top-[0%] lg:right-4 lg:top-[0%] z-20 pointer-events-none">
        <FlowerProject className="w-[200px] sm:w-[380px] lg:w-[480px]" />
      </div>

      <div className="projects-title title mt-16 sm:mt-32">
        <JumpingText className="text-hxlm sm:text-hxlt lg:text-[176px]/[162px] xl:text-hxl font-bold uppercase block">
          Projects
        </JumpingText>

        {/* <h1 className="text-hxlm sm:text-hxlt lg:text-[176px]/[162px] xl:text-hxl font-bold uppercase">
          Projects
        </h1> */}
        <span className="block text-remarkm sm:text-remarkt lg:text-remark text-dissolve-color mt-4 sm:mt-8 lg:mt-12">
          Welcome to the showcase of creative web works
        </span>
      </div>
      <div className="mt-8 sm:mt-28 text-bodym sm:text-bodyt lg:text-body relative">
        <p>
          Explore creative web projects created using
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={TechnologyLinks.THREEJS}
            className="text-accent-color hover:text-accent-color-active"
          >
            {" "}
            Three.js
          </a>
          ,{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={TechnologyLinks.WEBGL}
            className="text-accent-color hover:text-accent-color-active"
          >
            WebGL
          </a>
          ,{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={TechnologyLinks.BLENDER}
            className="text-accent-color hover:text-accent-color-active"
          >
            Blender{" "}
          </a>
          & other technologies for interactive web product and digital art.
        </p>
      </div>

      <ProjectThumbnail project={virtudes} />
      {/* <ProjectThumbnail project={cityscape} /> */}

      <div className="block text-bodysm sm:text-bodyst lg:text-bodys text-dissolve-color mb-4 sm:mb-8 lg:mb-12">
        More projects coming soon...
      </div>
    </div>
  );
};

export default ProjectsPage;
