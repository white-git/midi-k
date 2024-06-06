import { usePlocState } from '../../../../hooks/use-ploc-state';
import { InputText } from '../../../inputs/text/Text';
import { usePloc } from '../../../../hooks/ploc-context';

export function Delay() {
  const { midiPloc } = usePloc();
  const state = usePlocState(midiPloc);
  const isListening = state.current.listening;

  const update = () => {
    let timeout = 0;

    return (value: string) => {
      clearTimeout(timeout);
      if (!value) return;

      timeout = window.setTimeout(() => {
        midiPloc.setDelay(Number(value));
      }, 500);
    };
  };

  return (
    <div className="delay">
      <InputText
        label="Delay"
        name="delay"
        placeholder="100ms"
        disabled={isListening}
        onInput={update()}
        defaultValue={state.current.delay.toString()}
      />
    </div>
  );
}
