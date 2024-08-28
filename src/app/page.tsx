import BaseLayout from "@/components/BaseLayout/BaseLayout";
import { TechnologyLinks } from "@/constants";
import Link from "next/link";

export default function Home() {
  return (
    <BaseLayout>
      <div className="mx-4">
        <div className="grid grid-cols-3 sm:grid-cols-12 gap-4 mt-16 sm:mt-32">
          <div className="col-start-1 col-span-3 sm:col-start-1 sm:col-span-10 lg:col-start-1 lg:col-span-12">
            <h1 className="uppercase text-hxlm sm:text-hxlt lg:text-hxl font-bold">
              Digital Art <span className="text-dissolve-color">&</span>{" "}
              Creative Coding
            </h1>
          </div>

          <div className="mt-64 sm:mt-72 col-start-2 col-span-2 sm:col-start-8 sm:col-span-5 lg:col-start-9 lg:col-span-4 ">
            <h4 className="text-hsm sm:text-hst lg:text-hs font-medium">
              exploring the world of{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://en.wikipedia.org/wiki/Shader"
                className="inline text-accent-color hover:text-accent-color-active"
              >
                shaders
              </a>{" "}
              and <br />{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://en.wikipedia.org/wiki/3D_modeling"
                className="inline text-accent-color hover:text-accent-color-active"
              >
                3D modeling
              </a>{" "}
              on the web
            </h4>
          </div>
          <div className="mt-64 sm:mt-72 col-start-1 col-span-1 sm:col-start-1 sm:col-span-4  ">
            <p className="text-hxsm sm:text-hxst lg:text-hs font-medium">
              Hello, <br />
              I&#39;m Lena
            </p>
          </div>
          <div className="mt-64 sm:mt-72 col-start-2 col-span-3 sm:col-start-5 sm:col-span-8">
            <p className="text-bodysm sm:text-bodyst lg:text-bodys">
              As a creative developer specializing in visual design and
              generative art, I merge creativity with code to create lovely
              digital art and design projects. My passion for the generative art
              drives each work.
            </p>
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-12 gap-4 mt-16 sm:mt-32">
          <div className="sm:col-start-2 sm:col-span-6 gap-4">
            <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
              main technologies & libraries
            </span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={TechnologyLinks.THREEJS}
              className="block text-accent-color uppercase text-pillm sm:text-pillt lg:text-pill hover:text-accent-color-active font-medium"
            >
              Three.js
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={TechnologyLinks.WEBGL}
              className="block text-accent-color uppercase text-pillm sm:text-pillt lg:text-pill hover:text-accent-color-active font-medium"
            >
              webgl
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={TechnologyLinks.GLSL}
              className="block text-accent-color uppercase text-pillm sm:text-pillt lg:text-pill hover:text-accent-color-active font-medium"
            >
              glsl
            </a>
          </div>

          <div className="mt-12 sm:mt-36 lg:mt-44 col-start-1 col-span-3 sm:col-start-5 sm:col-span-7 lg:col-start-6 lg:col-span-7">
            <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
              works
            </span>
            <Link
              className="block text-accent-color uppercase text-pillm sm:text-pillt lg:text-pill hover:text-accent-color-active font-medium"
              href="/shots"
            >
              short gallery
            </Link>
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-12 gap-4 mt-72 sm:mt-96">
          <div className="sm:col-start-2 sm:col-span-11 lg:col-start-5 lg:col-span-8 gap-4">
            <p className="text-hxsm sm:text-hxst lg:text-hxs font-medium">
              Let&#39;s Collaborate & Create something amazing together
            </p>
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-12 gap-4 mt-44 sm:mt-16">
          <div className="sm:col-start-2 sm:col-span-11 lg:col-start-5 lg:col-span-8 gap-4">
            <span className="block text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark">
              feel free to
            </span>
            <Link
              className="block text-accent-color uppercase text-pillm sm:text-pillt lg:text-pill hover:text-accent-color-active font-medium"
              href="/contact"
            >
              reach me out
            </Link>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
