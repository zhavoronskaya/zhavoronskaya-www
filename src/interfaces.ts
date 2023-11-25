export interface IAlbum {
  name: string;
  slug: string;
  cover: string;
  coverAlt?: string;
  description: string;
  bandcamp: string; // iframe
  year: string;
  genre: string;
}

export interface IScene {
  name: string;
  slug: string;
  cover: string;
  coverAlt?: string;
  description: string;
  // component: string | React.ReactNode;
}

export interface IShot {
  name: string;
  slug: string;
  cover: string;
  coverAlt?: string;
  description?: string;
}

export type IScenesGallery = { scene: IScene; size: number }[][];
