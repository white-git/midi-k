import { MidiPresenter } from '../../midi/infrastructure/MidiPresenter';
import { ActionPresenter } from '../../action/infrastructure/ActionPresenter';

type Presenter = MidiPresenter | ActionPresenter;

export const useMidi = () => MidiPresenter.use();
export const useAction = () => ActionPresenter.use();

const cache: Map<string, Presenter> = new Map();

export function loadPresenter<P extends Presenter>(presenter: P) {
  const name = presenter.constructor.name;

  if (cache.get(name)) {
    return <P>cache.get(name);
  }

  cache.set(name, presenter);
  return presenter;
}
