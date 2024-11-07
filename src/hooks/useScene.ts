import { Scene } from "@/interfaces";
import { useObservableState } from "@/lib/ObservableState/hooks";
import { ScenesState } from "@/state";

type Props = {
  watch?: Array<keyof Scene | "*">;
};

const useScene = ({ watch }: Props = {}) => {
  const state = useObservableState(ScenesState, watch);

  return {
    state,
    setState: ScenesState.setState,
    getState: ScenesState.getState,
  };
};

export default useScene;
