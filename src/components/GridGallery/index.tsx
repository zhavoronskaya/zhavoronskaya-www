import { cn } from "@/helpers/ClassName";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { EyesIcon } from "../UI/icons";

type Props = {};

const GridGallery = ({}: Props) => {
  return (
    <div>
      <Grid title="Ray Marching" textEnd={false}>
        <Cell
          href="/shots/1"
          className="col-start-1  col-span-3 sm:col-start-1 sm:col-span-7 row-start-1 row-span-3 sm:row-span-5 lg:row-span-8"
        >
          <Video className="">
            <source src="/video/ray1-compressed-720.mp4" type="video/mp4" />
          </Video>
        </Cell>

        <Cell
          href="/shots/2/view"
          className=" col-start-1 col-span-3 sm:col-start-8 sm:col-span-5 row-start-4 row-span-3 sm:row-start-1 sm:row-span-7 lg:row-span-12"
        >
          <Video className="">
            <source src="/video/ray2-compressed-720.mp4" type="video/mp4" />
          </Video>
        </Cell>
        <Cell
          border={false}
          className="col-start-1 col-span-3 sm:col-span-6 lg:col-span-5 row-start-7 row-span-2 sm:row-start-8 sm:row-span-4 lg:row-start-[13] lg:row-span-5"
        >
          <p className="text-gallerybodym sm:text-gallerybodyt lg:text-gallerybody">
            Showcases using{" "}
            <a
              className=" text-accent-color hover:text-accent-color-active font-medium"
              target="_blank"
              rel="noopener noreferrer"
              href="https://en.wikipedia.org/wiki/Ray_marching"
            >
              Ray marching
            </a>{" "}
            techniques to explore the beauty of abstract forms and dynamic
            visuals.
          </p>
        </Cell>
      </Grid>

      <Grid title="Geometry">
        <Cell
          href="/shots/3"
          className="col-start-1 col-span-1 sm:col-span-5 row-start-1 row-span-3 sm:row-span-4 lg:row-span-6"
        >
          <Video className="">
            <source src="/video/object1-compressed-720.mp4" type="video/mp4" />
          </Video>
        </Cell>
        <Cell
          href="/shots/4/view"
          className="col-start-2 col-span-2 sm:col-start-6 sm:col-span-7 row-start-1 row-span-3 sm:row-span-4 lg:row-span-6"
        >
          <Video className="">
            <source src="/video/object2-compressed-720.mp4" type="video/mp4" />
          </Video>
        </Cell>
        <Cell
          href="/shots/5/view"
          className="col-start-1 col-span-2 sm:col-span-7 row-start-4 row-span-3 sm:row-start-5 sm:row-span-4 lg:row-start-7 lg:row-span-6"
        >
          <Video className="">
            <source src="/video/object3-compressed-720.mp4" type="video/mp4" />
          </Video>
        </Cell>
        <Cell
          href="/shots/6/view"
          className="col-start-3 col-span-1 sm:col-span-5 sm:col-start-8 row-start-4 row-span-3 sm:row-start-5 sm:row-span-4 lg:row-start-7 lg:row-span-6"
        >
          <Video className="">
            <source src="/video/object4-compressed-720.mp4" type="video/mp4" />
          </Video>
        </Cell>
        <Cell
          href="/shots/7/view"
          className="col-start-1 col-span-3 sm:col-span-6 row-start-7 row-span-3 sm:row-start-9 sm:row-span-4 lg:row-start-[13] lg:row-span-6"
        >
          <Video className="">
            <source src="/video/object5-compressed-720.mp4" type="video/mp4" />
          </Video>
        </Cell>
        <Cell
          border={false}
          className="col-start-1 col-span-3 sm:col-span-6 sm:col-start-7 row-start-[10] row-span-2 sm:row-start-[13] sm:row-span-3 lg:row-start-[19] lg:row-span-3"
        >
          <p className="text-gallerybodym sm:text-gallerybodyt lg:text-gallerybody">
            Collection of some experimentation with{" "}
            <a
              className=" text-accent-color hover:text-accent-color-active font-medium"
              target="_blank"
              rel="noopener noreferrer"
              href="https://threejs.org/manual/#en/primitives"
            >
              basic geometry
            </a>{" "}
            and shader material.
          </p>
        </Cell>
      </Grid>

      <Grid title="Particle Systems">
        <Cell
          href="/shots/8"
          className="col-start-1 col-span-3 sm:col-span-8 row-start-1 row-span-3 sm:row-span-4 lg:row-span-5"
        >
          <Video className="">
            <source
              src="/video/particles2-compressed-720.mp4"
              type="video/mp4"
            />
          </Video>
        </Cell>
        <Cell
          href="/shots/9/view"
          className="col-start-1 col-span-1 sm:col-start-9 sm:col-span-3 row-start-4 row-span-2 sm:row-start-2 sm:row-span-3 lg:row-start-2 lg:row-span-4"
        >
          <Video className="">
            <source
              src="/video/particles1-compressed-720.mp4"
              type="video/mp4"
            />
          </Video>
        </Cell>
        <Cell
          href="/shots/10/view"
          className="col-start-2 col-span-2 sm:col-start-6 sm:col-span-7 row-start-4 row-span-2 sm:row-start-5 sm:row-span-3 lg:row-start-6 lg:row-span-4"
        >
          <Video className="">
            <source
              src="/video/particles3-compressed-720.mp4"
              type="video/mp4"
            />
          </Video>
        </Cell>
        <Cell
          border={false}
          className="col-start-1 col-span-3 sm:col-span-5 row-start-6 row-span-2 sm:row-start-8 sm:row-span-4 lg:row-start-[10] lg:row-span-4"
        >
          <p className="text-gallerybodym sm:text-gallerybodyt lg:text-gallerybody">
            Small collection with{" "}
            <a
              className=" text-accent-color hover:text-accent-color-active font-medium"
              target="_blank"
              rel="noopener noreferrer"
              href="https://threejs.org/docs/#api/en/objects/Points"
            >
              particles
            </a>{" "}
            like dancing stars, forming and playing in intricate patterns and
            shapes.
          </p>
        </Cell>
      </Grid>

      <Grid title="Frame Buffer Objects">
        <Cell
          href="/shots/11"
          className="col-start-1 col-span-3 sm:col-span-7 row-start-1 row-span-3 sm:row-span-5 lg:row-span-7"
        >
          <Video className="">
            <source src="/video/fbo2-compressed-720.mp4" type="video/mp4" />
          </Video>
        </Cell>
        <Cell
          href="/shots/12"
          className="col-start-1 col-span-3 sm:col-start-8 sm:col-span-5 row-start-4 row-span-3 sm:row-start-2 sm:row-span-4 lg:row-start-2 lg:row-span-6"
        >
          <Video className="">
            <source src="/video/fbo1-compressed-720.mp4" type="video/mp4" />
          </Video>
        </Cell>
        <Cell
          href="/shots/13/view"
          className="col-start-1 col-span-1 sm:col-span-4 row-start-7 row-span-3 sm:row-start-6 sm:row-span-5 lg:row-start-8 lg:row-span-7"
        >
          <Video className="">
            <source src="/video/fbo6-compressed-720.mp4" type="video/mp4" />
          </Video>
        </Cell>
        <Cell
          href="/shots/14/view"
          className="col-start-2 col-span-2 sm:col-span-8 sm:col-start-5 row-start-7 row-span-3 sm:row-start-6 sm:row-span-5 lg:row-start-8 lg:row-span-7"
        >
          <Video className="">
            <source src="/video/fbo4-compressed-720.mp4" type="video/mp4" />
          </Video>
        </Cell>
        <Cell
          href="/shots/15/view"
          className="col-start-1 col-span-3 sm:col-span-6 row-start-[10] row-span-3 sm:row-start-[11] sm:row-span-4 lg:row-start-[15] lg:row-span-5"
        >
          <Video className="">
            <source src="/video/fbo3-compressed-720.mp4" type="video/mp4" />
          </Video>
        </Cell>
        <Cell
          border={false}
          className="col-start-1 col-span-3 sm:col-span-6 sm:col-start-7 row-start-[13] row-span-2 sm:row-start-[15] sm:row-span-4 lg:row-start-[20] lg:row-span-4"
        >
          <p className="text-gallerybodym sm:text-gallerybodyt lg:text-gallerybody">
            This showcases a series of experimental digital artworks that
            utilize{" "}
            <a
              className=" text-accent-color hover:text-accent-color-active font-medium"
              target="_blank"
              rel="noopener noreferrer"
              href="https://webglfundamentals.org/webgl/lessons/webgl-framebuffers.html"
            >
              Frame Buffer Objects
            </a>{" "}
            to create visual effects with particles.
          </p>
        </Cell>
      </Grid>

      <Grid title="Transmission">
        <Cell
          href="/shots/16/view"
          className="col-start-1 col-span-2 sm:col-span-9 row-start-1 row-span-3 sm:row-span-3 lg:row-span-7"
        >
          <Video className="">
            <source src="/video/tr4-compressed-720.mp4" type="video/mp4" />
          </Video>
        </Cell>
        <Cell
          href="/shots/17"
          className="col-start-1 col-span-3 sm:col-start-10 sm:col-span-3 row-start-4 row-span-3 sm:row-start-1 sm:row-span-2 lg:row-start-1 lg:row-span-5"
        >
          <Video className="">
            <source src="/video/tr1-compressed-720.mp4" type="video/mp4" />
          </Video>
        </Cell>
        <Cell
          href="/shots/18/view"
          className="col-start-3 col-span-1 sm:col-start-6 sm:col-span-4 row-start-1 row-span-3 sm:row-start-4 sm:row-span-3 lg:row-start-8 lg:row-span-5"
        >
          <Video className="">
            <source src="/video/tr3-compressed-720.mp4" type="video/mp4" />
          </Video>
        </Cell>
        <Cell
          href="/shots/19/view"
          className="col-start-1 col-span-3 sm:col-span-3 sm:col-start-10 row-start-7 row-span-3 sm:row-start-3 sm:row-span-4 lg:row-start-6 lg:row-span-7"
        >
          <Video className="">
            <source src="/video/rose-compressed-720.mp4" type="video/mp4" />
          </Video>
        </Cell>
        <Cell
          border={false}
          className="col-start-1 col-span-3 sm:col-span-5 sm:col-start-1 row-start-[10] row-span-2 sm:row-start-[7] sm:row-span-4 lg:row-start-[13] lg:row-span-4"
        >
          <p className="text-gallerybodym sm:text-gallerybodyt lg:text-gallerybody">
            Digital art works that explore the unique properties awesome{" "}
            <a
              className=" text-accent-color hover:text-accent-color-active font-medium"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/pmndrs/drei?tab=readme-ov-file#meshtransmissionmaterial"
            >
              Transmission Material
            </a>{" "}
            in{" "}
            <a
              className=" text-accent-color hover:text-accent-color-active font-medium"
              target="_blank"
              rel="noopener noreferrer"
              href="https://threejs.org/"
            >
              Three.js
            </a>{" "}
            world.
            <br />
          </p>
        </Cell>
      </Grid>

      <Grid title="Perlin Noise">
        <Cell
          href="/shots/21/view"
          className="col-start-1 col-span-3 sm:col-start-6 sm:col-span-7 row-start-1 row-span-3 sm:row-span-6 lg:row-span-9"
        >
          <Video className="">
            <source src="/video/grid-compressed-720.mp4" type="video/mp4" />
          </Video>
        </Cell>

        <Cell
          href="/shots/20"
          className=" col-start-1 col-span-3 sm:col-start-1 sm:col-span-5 row-start-4 row-span-3 sm:row-start-2 sm:row-span-3 lg:row-span-5"
        >
          <Video className="">
            <source src="/video/space-compressed-720.mp4" type="video/mp4" />
          </Video>
        </Cell>
        <Cell
          border={false}
          className="col-start-1 col-span-3 sm:col-span-5 lg:col-span-4 row-start-7 row-span-2 sm:row-start-7 sm:row-span-4 lg:row-start-[10] lg:row-span-5"
        >
          <p className="text-gallerybodym sm:text-gallerybodyt lg:text-gallerybody">
            Collection features two distinct pieces of abstract digital art,
            each crafted using{" "}
            <a
              className=" text-accent-color hover:text-accent-color-active font-medium"
              target="_blank"
              rel="noopener noreferrer"
              href="https://thebookofshaders.com/11/"
            >
              Perlin Noise
            </a>{" "}
            to generate unique and organic forms.
          </p>
        </Cell>
      </Grid>
    </div>
  );
};

const Grid = ({
  children,
  rows = 18,
  className,
  title,
  titleClassName,
  textEnd = false,
}: {
  className?: string;
  children: React.ReactNode;
  title: string;
  titleClassName?: string;
  rows?: number;
  textEnd?: boolean;
}) => {
  return (
    <div
      className={cn(
        "relative grid grid-cols-3 sm:grid-cols-12 my-16 sm:my-36 lg:my-64 gap-4",
        className
      )}
      style={{ gridAutoRows: "64px" }}
      // style={{ gridTemplateRows: `repeat(${rows}, 64px)` }}
    >
      <Title className={titleClassName} textEnd={textEnd}>
        {title}
      </Title>
      {children}
    </div>
  );
};

const Cell = ({
  className,
  children,
  border = true,
  href,
}: {
  children: React.ReactNode;
  className: string;
  href?: Url;
  border?: boolean;
}) => {
  const resultClassName = cn(
    "group relative overflow-hidden",
    { "rounded-xl border border-border-dissolve-color": border },
    className
  );

  if (href) {
    return (
      <Link href={href} className={resultClassName}>
        <div className="absolute flex flex-col inset-0 items-center justify-center opacity-0 bg-border-color group-hover:opacity-100 transition-opacity duration-300 z-10 ease-in">
          <EyesIcon
            fillColor="#F08CAE"
            className="w-[20px] sm:w-[32px] lg:w-[32px]"
          />
          {/* <span className="text-main-container-color text-center text-hintm sm:text-hintt lg:text-hint">
            view
          </span> */}
        </div>

        <div className="h-full w-full transition-transform duration-300 scale-100 group-hover:scale-110">
          {children}
        </div>
      </Link>
    );
  }

  return <div className={resultClassName}>{children}</div>;
};

const Title = ({
  className,
  children,
  textEnd,
}: {
  children: React.ReactNode;
  className?: string;
  textEnd?: boolean;
}) => {
  return (
    <h4
      className={cn(
        "absolute w-full z-10 top-[-20px] sm:top-[-44px] lg:top-[-64px] uppercase flex text-labelm sm:text-labelt lg:text-label text-gray-200 font-bold items-center mix-blend-difference",
        { "justify-end": textEnd },
        className
      )}
    >
      <span>{children}</span>
    </h4>
  );
};

export const Video = ({
  className,
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  // return <div className={cn("h-full w-full object-cover", className)}></div>;
  return (
    <video
      autoPlay
      muted
      playsInline
      loop
      className={cn("h-full w-full object-cover", className)}
    >
      {children}
    </video>
  );
};

export default GridGallery;
