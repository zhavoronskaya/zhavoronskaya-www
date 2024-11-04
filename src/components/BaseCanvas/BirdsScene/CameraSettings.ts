import { Vector3 } from "three";

// export const CAMERA_POSITIONINGS_MAP = {
//   default: {
//     id: "default",
//     position: new Vector3(-4.73, 10.49, 5.31),
//     target: new Vector3(0, 10, 0),
//     positionMobile: new Vector3(-4.73, 10.49, 5.31),
//     targetMobile: new Vector3(0, 10, 0),
//   },
//   firsTurn: {
//     id: "firsTurn",
//     position: new Vector3(-4.73, 2.49, 5.31),
//     target: new Vector3(0, 0.1, 0),
//     positionMobile: new Vector3(-4.73, 2.49, 5.31),
//     targetMobile: new Vector3(0, 0.1, 0),
//   },
//   secondTurn: {
//     id: "secondTurn",
//     position: new Vector3(-1.5, 4, 6.31),
//     target: new Vector3(-4, -0.5, 0),
//     positionMobile: new Vector3(-1.5, 4, 6.31),
//     targetMobile: new Vector3(-4, -0.5, 0),
//   },
//   lastTurn: {
//     id: "lastTurn",
//     position: new Vector3(-12.5, -8, 8.31),
//     target: new Vector3(-12, -8, 0),
//     positionMobile: new Vector3(-12.5, -8, 8.31),
//     targetMobile: new Vector3(-12, -8, 0),
//   },
// };

export const CAMERA_POSITIONINGS_MAP = {
  default: {
    id: "default",
    position: new Vector3(-4.73, 10.49, 5.31),
    target: new Vector3(0, 10, 0),
  },
  firsTurn: {
    id: "firsTurn",
    position: new Vector3(-4.73, 2.49, 5.31),
    target: new Vector3(0, 0.1, 0),
  },
  secondTurn: {
    id: "secondTurn",
    position: new Vector3(-1.5, 4, 6.31),
    target: new Vector3(-4, -0.5, 0),
  },
  lastTurn: {
    id: "lastTurn",
    position: new Vector3(-12.5, -8, 8.31),
    target: new Vector3(-12, -8, 0),
  },
};

export const CAMERA_POSITIONINGS_MAP_TOUCH_SCREEN = {
  default: {
    id: "default",
    position: new Vector3(-4.73, 10.49, 5.31),
    target: new Vector3(0, 10, 0),
  },
  firsTurn: {
    id: "firsTurn",
    position: new Vector3(-2.73, 2.49, 6.31),
    target: new Vector3(-1, 0.1, 0),
  },
  secondTurn: {
    id: "secondTurn",
    position: new Vector3(-4.5, 4, 7.31),
    target: new Vector3(-2, -0.5, 0),
  },
  lastTurn: {
    id: "lastTurn",
    position: new Vector3(-12.5, -8, 8.31),
    target: new Vector3(-12, -8, 0),
  },
};
