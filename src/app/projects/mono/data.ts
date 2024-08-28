import { TechnologyLinks } from "@/constants";
import { IProject } from "@/interfaces";

const mono: IProject = {
  name: ["MONO/", "kami"],
  label: "Enjoy online experience of virtual visiting",
  thumbnailDIscription:
    "Architectural 3D project blending functionality and aesthetics",
  thumbnailVideoUrl: "video/mono1-compressed-720.mp4",
  routing: "/projects/mono",
  link: `${TechnologyLinks.MONO}`,
  description: " ",
  technology: [
    { src: `${TechnologyLinks.BLENDER}`, name: "Blender" },
    { src: `${TechnologyLinks.THREEJS}`, name: "Three.js" },
    { src: `${TechnologyLinks.NEXT}`, name: "Next.js" },
  ],
  developmentSteps: [
    {
      name: "3D Modeling in Blender",
      items: [
        "Creating a map from svg (walls, ground)",
        "Adding props (trees, sculptures, benches etc.)",
        "Material Shading for props and walls",
        "Model optimisation (decrease vertex amount)",
        "Baking textures",
      ],
    },
    {
      name: "Design",
      items: [
        "Content & Photo Selection",
        "Preparing a multimedia element (field recording sound of the park, mastering)",
        "Landing Page Design",
        "Responsive Layout",
      ],
    },
    {
      name: "Code",
      items: [
        "Skybox & Environment settings",
        "Scroll based animation (camera movement)",
        "Performance optimisation (level of detail)",
        "CSS animation",
        "Light & Dark Mode",
        "Background music toggle",
      ],
    },
  ],
};

export default mono;
