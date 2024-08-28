import { IShotData } from "@/interfaces";

const logo: IShotData = {
  name: "Logo",
  ref: [
    {
      name: "Noise Book of Shaders",
      src: "https://thebookofshaders.com/11/",
    },
    {
      name: "GLSL Noise",
      src: "https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83",
    },
    {
      name: "Shader Toy",
      src: "https://www.shadertoy.com/results?query=perlin",
    },
    {
      name: "Medium",
      src: "https://franky-arkon-digital.medium.com/visualizing-3d-perlin-noise-in-three-js-1ade5ac9eb63",
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
      src: "/shots/perlin/perlin1.png",
      alt: "Perlin Noise Scene",
    },
    {
      width: 600,
      height: 600,
      src: "/shots/perlin/perlin2.png",
      alt: "Perlin Noise Scene",
    },
    {
      width: 600,
      height: 600,
      src: "/shots/perlin/perlin3.png",
      alt: "Perlin Noise Scene",
    },
  ],
  description: "",
  tags: ["noise", "transmission", "text"],
};

export default logo;
