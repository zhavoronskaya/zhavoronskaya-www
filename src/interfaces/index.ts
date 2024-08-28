export interface IImageData {
  width: number;
  height: number;
  alt: string;
  src: string;
  className?: string;
}

export interface IImageLink {
  href: string;
  image: IImageData;
}

export interface IImageSlider {
  images: IImageData[];
}

export interface IIcon {
  fillColor?: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

export interface IProject {
  name: string[];
  thumbnailDIscription?: string;
  thumbnailVideoUrl: string;
  // thumbnailSize: ImageSizes;
  label: string;
  link: string;
  routing: string;
  projectImages?: string[];
  description?: string;
  technology?: Technolody[];
  developmentSteps?: DevelopmentSteps[];
}

export interface IRefData {
  name: string;
  src: string;
}
export interface IShotData {
  ref: IRefData[];
  images: IImageData[];
  name: string;
  description?: string;
  tags: string[];
  href?: string;
}
export interface IAlbum {
  name: string;
  label: string;
  description?: string;
  tags: string[];
  images: IImageData[];
  info: Info;
}

export type Info = {
  mastered: string;
  artwork: string;
  released: string;
  date: string;
  href: string;
};

export type Technolody = {
  src: string;
  name: string;
};
export type DevelopmentSteps = {
  name: string;
  items: string[];
};

export type ImageSizes = {
  width: number;
  height: number;
};

// export type CanvasProps = {
//   children: React.ReactNode;
//   camera: Camera;
// };
