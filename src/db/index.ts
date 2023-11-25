import { albums, selectedAlbums } from "./albums";
import { galleryShots, shots } from "./shots";

export async function getSelectedAlbums() {
  return selectedAlbums;
}
export async function getAlbums() {
  return albums;
}

export async function getShots() {
  return shots;
}

export async function getGalleryShots() {
  return galleryShots;
}
