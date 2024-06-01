import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Ploc } from '../../core/common/infrastructure/Ploc';

type State<S> = [S, Dispatch<SetStateAction<S>>];

export function usePlocState<S>(ploc: Ploc<S>) {
  const [state, setState]: State<S> = useState(ploc.state);

  useEffect(() => {
    const update = (state: S) => setState(state);
    ploc.subscribe(update);
  }, []);

  return state;
}
