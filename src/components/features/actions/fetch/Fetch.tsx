import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { usePlocState } from '../../../../hooks/use-ploc-state';
import { usePloc } from '../../../../hooks/ploc-context';

export function Fetch() {
  const { midiPloc } = usePloc();
  const state = usePlocState(midiPloc);
  const isLoading = state.kind === 'LoadingMidiState';

  const getInputs = () => {
    midiPloc.getInputs();
  };

  return (
    <button className="button features-button" disabled={isLoading} onClick={getInputs}>
      <FontAwesomeIcon icon={faRotate} />
    </button>
  );
}
