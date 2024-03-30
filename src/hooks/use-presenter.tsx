import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { Presenter } from '../../core/shared/infrastructure/Presenter'

type State<S> = [S, Dispatch<SetStateAction<S>>]

export function usePresenter<S>(presenter: Presenter<S>) {
  const [state, setState]: State<S> = useState(presenter.state)

  useEffect(() => {
    const update = (state: S) => setState(state)
    presenter.subscribe(update)
    update(presenter.state)
  }, [])

  return state
}
