import React from "react";
import { ObservableState } from ".";

export function useObservableState<T>(
  observable: ObservableState<T>,
  keys: Array<keyof T | "*"> = []
) {
  const [state, setState] = React.useState(() => observable.getState());

  React.useEffect(() => {
    if (!keys.length) return;
    return observable.subscribe(setState, keys);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, keys);

  return state;
}
