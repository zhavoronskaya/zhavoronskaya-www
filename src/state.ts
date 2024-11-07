import { Scene } from "./interfaces";
import createObservableState from "./lib/ObservableState";

export const ScenesState = createObservableState<Scene>({
  notesGroupPosition: { x: 0, y: 0 },
  notesPlayingStatus: "OFF",
});
