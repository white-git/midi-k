import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { usePlocState } from '../../../../hooks/use-ploc-state';
import { usePloc } from '../../../../hooks/ploc-context';

export function Play() {
  const { actionPloc, midiPloc } = usePloc();
  const state = usePlocState(midiPloc);
  const isLoading = state.kind === 'LoadingMidiState';
  const isEnabled = state.current.valid();
  const isListening = state.current.listening;

  const listenCurrentMidi = () => {
    if (state.current.listening) midiPloc.stop();
    else midiPloc.play(actionPloc.calls.bind(actionPloc));
  };

  return (
    <button className="button features-button" disabled={isLoading || !isEnabled} onClick={listenCurrentMidi}>
      <FontAwesomeIcon icon={isListening ? faStop : faPlay} />
    </button>
  );
}
