import { TechnologyLinks } from "@/constants";
import { IProject } from "@/interfaces";

const virtudes: IProject = {
  name: ["Parque das ", "Virtudes"],
  label: "Enjoy online experience of virtual visiting",
  thumbnailDIscription: "3D Web Project: A Park in Porto, Portugal",
  thumbnailVideoUrl: "/video/virtudes.mp4",
  routing: "/projects/parque-das-virtudes",
  link: `${TechnologyLinks.VIRTUDES}`,
  description:
    " Web project dedicated to park in Porto, Portugal, representing a low poly 3D map of a park.",
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

export default virtudes;
