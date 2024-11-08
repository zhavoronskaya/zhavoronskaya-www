import { IShotData } from "@/interfaces";

const rayMarging: IShotData = {
  name: "Ray Marching & Perlin Noise",
  ref: [
    {
      name: "Shader Toy",
      src: "https://www.shadertoy.com/results?query=ray+marching",
    },
    {
      name: "Inigo Quilez",
      src: "https://iquilezles.org/",
    },
    {
      name: "The Art of Code",
      src: "https://www.youtube.com/@TheArtofCodeIsCool",
    },
    {
      name: "Maxime Heckel Blog",
      src: "https://blog.maximeheckel.com/",
    },
    // {
    //   name: "Simon Dev ",
    //   src: "https://blog.maximeheckel.com/",
    // },
  ],
  images: [
    {
      width: 600,
      height: 600,
      src: "/shots/raymarching/ray1.png",
      alt: "Ray Marching Scene",
    },
    {
      width: 600,
      height: 600,
      src: "/shots/raymarching/ray2.png",
      alt: "Ray Marching Scene",
    },
    {
      width: 600,
      height: 600,
      src: "/shots/raymarching/ray3.png",
      alt: "Ray Marching Scene",
    },
  ],
  description: "",
  tags: ["shaders", "perlin_noise", "ray_marching"],
};

export default rayMarging;
