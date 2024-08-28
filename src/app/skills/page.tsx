import BaseLayout from "@/components/BaseLayout/BaseLayout";
import { SocialLinks, TechnologyLinks } from "@/constants";
import Link from "next/link";

type Props = {};

const SkillsPage = ({}: Props) => {
  return (
    <BaseLayout>
      <div className="px-8">
        <div className="mt-12 sm:mt-24 sm:grid sm:grid-cols-12 sm:gap-4">
          <div className=" sm:col-start-6 sm:col-span-7 lg:col-start-5 lg:col-span-8">
            <div>
              <h3 className="text-hlm sm:text-hmt lg:text-hl font-medium">
                Lena <br /> Zhavoronskaya
              </h3>
              <span className="block text-remarkm sm:text-remarkt lg:text-remark text-dissolve-color ">
                Creative developer & Digital artist
              </span>
            </div>
          </div>

          <div className=" sm:col-start-1 sm:row-start-1 sm:col-span-5 lg:col-start-1 lg:col-span-4">
            <div className="mt-4 ">
              <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
                contact
              </span>
              <a
                target="_blank"
                rel="noopener noreferrer"
                type="email"
                href="mailto:zhavoronskaya.public@gmail.com"
                className="text-accent-color uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm hover:text-accent-color-active font-medium"
              >
                email
              </a>
              <span className="block text-accent-color hover:text-accent-color-active text-linkm sm:text-link">
                {SocialLinks.EMAIL}
              </span>
            </div>
            <div className="mt-8 sm:mt-12 lg:mt-6">
              <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
                social
              </span>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={SocialLinks.TWITTER}
                className="block text-accent-color uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm hover:text-accent-color-active font-medium"
              >
                twitter
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={SocialLinks.INSTAGRAM}
                className="block text-accent-color uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm hover:text-accent-color-active font-medium"
              >
                instagram
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={SocialLinks.TELEGRAM}
                className="block text-accent-color uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm hover:text-accent-color-active font-medium"
              >
                telegram
              </a>
            </div>
          </div>

          <div className=" sm:col-start-6 sm:col-span-7 lg:col-start-5 lg:col-span-8">
            <div className="mt-12 sm:mt-4 lg:mt-8">
              <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
                about
              </span>
              <p className="text-bodysm sm:text-bodyst lg:text-bodys">
                Creative developer with a focus on visual design and generative
                art.
                <br />
                Currently based and working in Porto, Portugal.
                <br />
                My passion lies in blending the boundaries between technology
                and artistic expression, utilizing cutting-edge tools to bring
                imaginative concepts to life and continually pushing the
                boundaries of what&#39;s possible in digital art and design.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 sm:mt-64 lg:mt-56 text-end">
          <h4 className="text-hsm sm:text-hst lg:text-hm text-end font-medium">
            skills
          </h4>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-12 gap-4 mt-4 sm:mt-16 lg:mt-12">
          <div className="col-start-2 col-span-2 sm:col-start-1 sm:col-span-6">
            <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
              technologies / libraries / frameworks
            </span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={TechnologyLinks.WEBGL}
              className="block text-accent-color uppercase text-hintm sm:text-hintt lg:text-hint hover:text-accent-color-active font-medium"
            >
              webgl
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={TechnologyLinks.GLSL}
              className="block text-accent-color uppercase text-hintm sm:text-hintt lg:text-hint hover:text-accent-color-active font-medium"
            >
              glsl
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={TechnologyLinks.REACT}
              className="block text-accent-color uppercase text-hintm sm:text-hintt lg:text-hint hover:text-accent-color-active font-medium"
            >
              react
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={TechnologyLinks.FIBER}
              className="block text-accent-color uppercase text-hintm sm:text-hintt lg:text-hint hover:text-accent-color-active font-medium"
            >
              react/three-fiber
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={TechnologyLinks.DREI}
              className="block text-accent-color uppercase text-hintm sm:text-hintt lg:text-hint hover:text-accent-color-active font-medium"
            >
              react/three-drei
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={TechnologyLinks.THREEJS}
              className="block text-accent-color uppercase text-hintm sm:text-hintt lg:text-hint hover:text-accent-color-active font-medium"
            >
              three.js
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={TechnologyLinks.NEXT}
              className="block text-accent-color uppercase text-hintm sm:text-hintt lg:text-hint hover:text-accent-color-active font-medium"
            >
              next.js
            </a>
            <span className="block text-accent-color uppercase text-hintm sm:text-hintt lg:text-hint font-medium">
              c++
            </span>
          </div>
          <div className="col-start-1 col-span-2 sm:col-start-7 sm:col-span-4">
            <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
              software
            </span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={TechnologyLinks.BLENDER}
              className="block text-accent-color uppercase text-hintm sm:text-hintt lg:text-hint hover:text-accent-color-active font-medium"
            >
              blender
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={TechnologyLinks.VSCODE}
              className="block text-accent-color uppercase text-hintm sm:text-hintt lg:text-hint hover:text-accent-color-active font-medium"
            >
              vs code
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={TechnologyLinks.FIGMA}
              className="block text-accent-color uppercase text-hintm sm:text-hintt lg:text-hint hover:text-accent-color-active font-medium"
            >
              figma
            </a>
            <span className="block text-accent-color uppercase text-hintm sm:text-hintt lg:text-hint font-medium">
              photoshop
            </span>
            <span className="block text-accent-color uppercase text-hintm sm:text-hintt lg:text-hint font-medium">
              xcode
            </span>
          </div>
        </div>

        <div className="mt-48 sm:mt-80 lg:mt-72 text-end">
          <h4 className="text-hsm sm:text-hst lg:text-hm text-end font-medium">
            experience
          </h4>
        </div>

        <div className="mt-4 sm:mt-16 lg:mt-12 sm:w-3/5">
          <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
            2016-2022
          </span>
          <p className="text-hintm sm:text-hintt lg:text-hint font-medium opacity-75">
            Math science engineer
          </p>
          <br />
          <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
            2022-now
          </span>
          <p className="text-hintm sm:text-hintt lg:text-hint font-medium opacity-75">
            Freelance Creative developer
          </p>
        </div>

        <div className="mt-44 sm:mt-80 lg:mt-72 text-end">
          <h4 className="text-hsm sm:text-hst lg:text-hm text-end font-medium">
            work flow
          </h4>
        </div>

        <div className="sm:grid sm:grid-cols-12 mt-6 sm:mt-12 lg:mt-16  ">
          <div className="sm:col-start-1 sm:col-span-8 lg:col-span-9">
            <p className="text-bodysm sm:text-bodyst lg:text-bodys">
              Love developing engaging projects for the web. Through interactive
              installations or digital canvases, my work aims to engage,
              inspire, and transform perceptions of art and technology.
              <br />
              Always open to learning new things and most important to
              experiment.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-12 mt-44 sm:mt-12 lg:mt-16 ">
          <div className="col-start-2 col-span-2 sm:col-start-7 sm:col-span-6">
            <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
              work&code
            </span>
            <Link
              href="/shots"
              className="block text-accent-color uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm hover:text-accent-color-active font-medium"
            >
              shots
            </Link>
            <Link
              href="/projects"
              className="block text-accent-color uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm hover:text-accent-color-active font-medium"
            >
              projects
            </Link>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={TechnologyLinks.GITHUB}
              className="block text-accent-color uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm hover:text-accent-color-active font-medium"
            >
              github repository
            </a>
          </div>
        </div>

        <div className="mt-44 sm:mt-80 lg:mt-72 text-end">
          <h4 className="text-hsm sm:text-hst lg:text-hm text-end font-medium">
            education
          </h4>
        </div>

        <div className="mt-4 sm:mt-16 lg:mt-12 ">
          <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
            2011-2017
          </span>
          <p className="text-hintm sm:text-hintt lg:text-hint font-medium opacity-75">
            Masters of Experimental and theoretical physics
          </p>
          <span className="block text-dissolve-color text-linkm sm:text-link">
            National Research Nuclear University MEPHI
          </span>
          <br />
          <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
            2022-now
          </span>
          <p className="text-hintm sm:text-hintt lg:text-hint font-medium opacity-75">
            Creative Developer&Designer
          </p>
          <span className="block text-dissolve-color text-linkm sm:text-link">
            self-study
          </span>
        </div>
        <div className="mt-24 sm:mt-12 mb-36 lg:mt-16 sm:grid sm:grid-cols-12">
          <div className="sm:col-start-6 sm:col-span-7 lg:col-start-6 lg:col-span-7">
            <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
              courses&tutorials
            </span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={TechnologyLinks.SHADERBOOK}
              className="block text-accent-color uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm hover:text-accent-color-active font-medium"
            >
              the book of shaders
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={TechnologyLinks.SIMONSHADER}
              className="block text-accent-color uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm hover:text-accent-color-active font-medium"
            >
              simondev shaders
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={TechnologyLinks.THREEJOURNEY}
              className="block text-accent-color uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm hover:text-accent-color-active font-medium"
            >
              three.js journey
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={TechnologyLinks.ARTCODE}
              className="block text-accent-color uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm hover:text-accent-color-active font-medium"
            >
              the art of code
            </a>
            <span className="block text-dissolve-color uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm font-medium">
              & many others
            </span>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default SkillsPage;
