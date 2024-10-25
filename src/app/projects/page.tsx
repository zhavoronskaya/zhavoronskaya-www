import { TechnologyLinks } from "@/constants";
import virtudes from "./parque-das-virtudes/data";
import mono from "./mono/data";
import ProjectThumbnail from "@/modules/projects/components/ProjectThumbnail";

type Props = {};

const ProjectsPage = ({}: Props) => {
  return (
    <div className="px-8">
      <div className="mt-16 sm:mt-32">
        <h1 className="text-hxlm sm:text-hxlt lg:text-hxl font-bold uppercase">
          Projects
        </h1>
        <span className="block text-remarkm sm:text-remarkt lg:text-remark text-dissolve-color mt-4 sm:mt-8 lg:mt-12">
          Welcome to the showcase of creative web works
        </span>
      </div>
      <div className="mt-8 sm:mt-28 text-bodym sm:text-bodyt lg:text-body">
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
      <ProjectThumbnail project={mono} />
      {/* <div className="w-full mt-12 sm:mt-20 lg:mt-24 ">
          <Image
            width="3012"
            height="1616"
            alt=""
            className="block object-cover w-full h-full rounded-lg border-border-image-color"
            src="/projects/virtudes.webp"
          />
        </div>

        <div className="sm:grid sm:grid-cols-12">
          <div className="sm:col-start-1 sm:col-span-8">
            <h4 className="mt-4 sm:mt-8 text-hsm sm:text-hst lg:text-hs font-medium ">
              {virtudes.name} {virtudes.subname}
            </h4>
            <span className="block text-remarkm sm:text-remarkt lg:text-remark text-dissolve-color">
              3D Web Project: A Park in Porto, Portugal
            </span>
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-12">
          <div className="sm:col-start-9 sm:col-span-4 mt-8  mb-8 sm:mb-16">
            <Link
              href="/projects/parque-das-virtudes"
              className=" block text-accent-color uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm hover:text-accent-color-active font-medium"
            >
              view project
            </Link>
          </div>
        </div> */}
    </div>
  );
};

export default ProjectsPage;
