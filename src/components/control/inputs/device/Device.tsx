import { usePlocState } from '../../../../hooks/use-ploc-state';
import { InputSelect } from '../../../inputs/select/Select';
import { usePloc } from '../../../../hooks/ploc-context';

export function Device() {
  const { midiPloc } = usePloc();
  const state = usePlocState(midiPloc);
  const isListening = state.current.listening;
  const options = state.kind === 'UpdatedMidiState'
    ? [
        { text:'None', value: '' },
        ...state.inputs.map(o => ({ text: o.name, value: o.id })),
    ]
    : [];

  const select = (id: string | number) => {
    if (!id) midiPloc.clearDevice();
    else midiPloc.setDevice(id.toString());
  };

  return (
    <div className="device">
      <InputSelect
        label="Device"
        name="device"
        options={options}
        onChange={select}
        value={state.current.device?.id}
        disabled={isListening}
      />
    </div>
  );
}
