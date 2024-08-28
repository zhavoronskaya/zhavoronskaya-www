import BaseLayout from "@/components/BaseLayout/BaseLayout";

import Image from "next/image";

import virtudes from "./data";
import ProjectPageLayout from "@/modules/projects/components/ProjectPageLayout";

type Props = {};

const VirtudesProject = ({}: Props) => {
  return (
    <BaseLayout>
      <ProjectPageLayout project={virtudes}>
        <div className="mt-8 sm:mt-12 lg:mt-20 sm:grid sm:grid-cols-12 sm:gap-4">
          <div className="mb-4 sm:mb-0 :sm:col-start-1 sm:col-span-12 h-[224px] lg:h-[640px] sm:h-[512px]">
            <Image
              width="3012"
              height="1616"
              alt=""
              className="object-cover w-full h-full rounded-lg border-border-image-color"
              src="/projects/virtudes1.webp"
            />
          </div>
          <div className="mb-4 sm:mb-0 sm:col-start-1 sm:col-span-7 h-[224px] lg:h-[528px] sm:h-[288px]">
            <Image
              width="3012"
              height="1616"
              alt=""
              className="object-cover w-full h-full rounded-lg border-border-image-color"
              src="/projects/virtudes2.webp"
            />
          </div>
          <div className="sm:col-start-8 sm:col-span-5 h-[224px] lg:h-[528px] sm:h-[288px]">
            <Image
              width="1648"
              height="2198"
              alt=""
              className="object-cover w-full h-full rounded-lg border-border-image-color"
              src="/projects/virtudes3.webp"
            />
          </div>
        </div>
      </ProjectPageLayout>
      {/* <div className="px-8">
        <div className="mt-4">
          <Link
            href="/projects"
            className=" block text-accent-color uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm hover:text-accent-color-active font-medium"
          >
            projects
          </Link>
        </div>
        <div className="mt-16 sm:mt-36 sm:grid sm:grid-cols-12">
          <div className="sm:col-start-1 sm:col-span-9 ">
            <h1 className="sm:mt-12 text-hxlm sm:text-hxlt lg:text-hxl font-bold ">
              Parque das <br /> Virtudes
            </h1>
            <span className="block text-remarkm sm:text-remarkt lg:text-remark text-dissolve-color ">
              Enjoy online experience of virtual visiting
            </span>
          </div>
        </div>

        <div className="mt-48 sm:mt-36 grid grid-cols-3 sm:grid-cols-12">
          <div className="col-start-2 col-span-2 sm:col-start-8 sm:col-span-5">
            <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
              deeper immersion
            </span>
            <a     target="_blank"           rel="noopener noreferrer"
              href={TechnologyLinks.VIRTUDES}
              className="block text-accent-color uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm hover:text-accent-color-active font-medium"
            >
              take a look
            </a>
          </div>
        </div>
        <div className="mt-20 sm:mt-36 sm:grid sm:grid-cols-12">
          <div className="sm:col-start-1 sm:col-span-7">
            <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
              about
            </span>
            <p className="text-bodysm sm:text-bodyst lg:text-bodys">
              Web project dedicated to park in Porto, Portugal, representing a
              low poly 3D map of a park.
            </p>
          </div>
        </div>
        <div className="mt-8 sm:mt-12 lg:mt-20 sm:grid sm:grid-cols-12 sm:gap-4">
          <div className="mb-4 sm:mb-0 :sm:col-start-1 sm:col-span-12 h-[224px] lg:h-[640px] sm:h-[512px]">
            <Image
              width="3012"
              height="1616"
              alt=""
              className="object-cover w-full h-full rounded-lg border-border-image-color"
              src="/projects/virtudes1.webp"
            />
          </div>
          <div className="mb-4 sm:mb-0 sm:col-start-1 sm:col-span-7 h-[224px] lg:h-[528px] sm:h-[288px]">
            <Image
              width="3012"
              height="1616"
              alt=""
              className="object-cover w-full h-full rounded-lg border-border-image-color"
              src="/projects/virtudes2.webp"
            />
          </div>
          <div className="sm:col-start-8 sm:col-span-5 h-[224px] lg:h-[528px] sm:h-[288px]">
            <Image
              width="1648"
              height="2198"
              alt=""
              className="object-cover w-full h-full rounded-lg border-border-image-color"
              src="/projects/virtudes3.webp"
            />
          </div>
        </div>
        <div className="mt-8 sm:mt-12 lg:mt-20 sm:grid sm:grid-cols-12">
          <div className="sm:col-start-1 sm:col-span-11 lg:col-span-7">
            <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
              technologies
            </span>
            <p className="text-bodysm sm:text-bodyst lg:text-bodys">
              Main technologies used in the development of this project &#8212;
              <a     target="_blank"           rel="noopener noreferrer"
                href={TechnologyLinks.BLENDER}
                className="text-accent-color hover:text-accent-color-active uppercase"
              >
                {" "}
                Blender
              </a>
              ,{" "}
              <a     target="_blank"           rel="noopener noreferrer"
                href={TechnologyLinks.THREEJS}
                className="text-accent-color hover:text-accent-color-active uppercase"
              >
                Three.js
              </a>
              ,{" "}
              <a     target="_blank"           rel="noopener noreferrer"
                href={TechnologyLinks.NEXT}
                className="text-accent-color hover:text-accent-color-active uppercase"
              >
                Next.js
              </a>
            </p>
          </div>
        </div>

        <div className="mt-20 sm:mt-32">
          <span className="block text-remarkm sm:text-remarkt lg:text-remark text-dissolve-color">
            steps of development
          </span>
          <p className="uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm font-medium">
            3D Modeling in Blender
          </p>
        </div>

        <div className="mt-4 lg:mt-8">
          <DecorativeList
            items={[
              "Creating a map from svg (walls, ground)",
              "Adding props (trees, sculptures, benches etc.)",
              "Material Shading for props and walls",
              "Model optimisation (decrease vertex amount)",
              "Baking textures",
            ]}
          />
        </div>
        <div className="mt-12 sm:mt-16 lg:mt-24">
          <p className="uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm font-medium">
            Design
          </p>
        </div>
        <div className="mt-4 lg:mt-8">
          <DecorativeList
            items={[
              "Content & Photo Selection",
              "Preparing a multimedia element (field recording sound of the park, mastering)",
              "Landing Page Design",
              "Responsive Layout",
            ]}
          />
        </div>
        <div className="mt-12 sm:mt-16 lg:mt-24">
          <p className="uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm font-medium">
            Code
          </p>
        </div>
        <div className="mt-4 lg:mt-8">
          <DecorativeList
            items={[
              "Skybox & Environment settings",
              "Scroll based animation (camera movement)",
              "Performance optimisation (level of detail)",
              "CSS animation",
              "Light & Dark Mode",
              "Background music toggle",
            ]}
          />
        </div>
        <div className="mt-28 mb-12 sm:mb-20 sm:mt-36 grid grid-cols-3 sm:grid-cols-12">
          <div className="col-start-2 col-span-2 sm:col-start-8 sm:col-span-5">
            <a     target="_blank"           rel="noopener noreferrer"
              href={TechnologyLinks.VIRTUDES}
              className="block text-accent-color uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm hover:text-accent-color-active font-medium"
            >
              Visit Project
            </a>
          </div>
        </div>
      </div> */}
    </BaseLayout>
  );
};

export default VirtudesProject;
