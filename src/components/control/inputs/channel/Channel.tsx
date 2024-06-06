import { useEffect } from 'react';
import { usePlocState } from '../../../../hooks/use-ploc-state';
import { channels } from '../../../../../core/midi/domain/Midi';
import { InputSelect } from '../../../inputs/select/Select';
import { usePloc } from '../../../../hooks/ploc-context';

export function Channel() {
  const { midiPloc } = usePloc();
  const state = usePlocState(midiPloc);
  const options = channels.map(c => ({ text: c, value: c }));
  const isListening = state.current.listening;

  const select = (channel: string | number) => {
    midiPloc.setChannel(Number(channel));
  };

  useEffect(() => {
    const channel = document.querySelector('#channel') as HTMLInputElement;
    midiPloc.setChannel(Number(channel.value));
  }, []);

  return (
    <div className="channel">
      <InputSelect
        label="Channel"
        name="channel"
        options={options}
        onChange={select}
        disabled={isListening}
      />
    </div>
  );
}
