import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowUp } from '@fortawesome/free-solid-svg-icons';
import { usePlocState } from '../../../../hooks/use-ploc-state';
import { plocContext } from '../../../../hooks/ploc-context';

export function Save() {
  const { actionPloc } = plocContext();
  const state = usePlocState(actionPloc);
  const isDisabled = !state.actions.length;

  const save = () => {
    actionPloc.save();
  };

  return (
    <button className="button features-button" disabled={isDisabled} onClick={save}>
      <FontAwesomeIcon icon={faFileArrowUp} />
    </button>
  );
}
