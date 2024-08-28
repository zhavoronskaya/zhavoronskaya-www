import { IShotData } from "@/interfaces";

const shell: IShotData = {
  name: "Tramsmisson Material & 3D Model",
  ref: [
    {
      name: "Three.js Transmission Material",
      src: "https://threejs.org/examples/webgl_materials_physical_transmission.html",
    },
    {
      name: "Medium",
      src: "https://medium.com/geekculture/understanding-the-three-js-transmission-example-13e952a8ab55",
    },
    {
      name: "CodeSandbox",
      src: "https://codesandbox.io/p/sandbox/hmgdjq",
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
      src: "/shots/transparent/shell1.png",
      alt: "Transmission Scene",
    },
    {
      width: 600,
      height: 600,
      src: "/shots/transparent/shell2.png",
      alt: "Transmission Scene",
    },
    {
      width: 600,
      height: 600,
      src: "/shots/transparent/shell3.png",
      alt: "Transmission Scene",
    },
  ],
  description: "",
  tags: ["transmission", "shaders", "blender3D"],
};

export default shell;
