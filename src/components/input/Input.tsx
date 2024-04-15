import { useEffect, FormEventHandler, useRef } from 'react';
import { usePresenter } from '../../hooks/use-presenter';
import { formdataToObject } from '../../helpers/formdata';
import { loadPresenter, useMidi } from '../../../core/common/infrastructure/Locator';
import { MaybeMidi } from '../../../core/midi/domain/Midi';
import './Input.scss';

export function Input() {
  const midiPresenter = loadPresenter(useMidi());
  const midiState = usePresenter(midiPresenter);
  const $form = useRef<HTMLFormElement>(document.createElement('form'));

  const resetMidi = (clean?: boolean) => {
    const id = midiState.current.device?.id;
    if (id) midiPresenter.stopListening(id, clean);
  };

  const formValues = () => {
    const form = $form.current;
    const data = new FormData(form);
    return formdataToObject<MaybeMidi>(data);
  };

  const updateMidi: FormEventHandler = (e) => {
    const { value } = e.target as HTMLSelectElement;
    resetMidi(value === '');
    const data = formValues();
    midiPresenter.createMidi(data);
  };

  const clear = () => {
    resetMidi();
  };

  const channels = () => {
    return Array.from({ length: 16 }, (_, i) => i + 1);
  };

  useEffect(() => {
    midiPresenter.getInputs();
  }, []);

  useEffect(() => {
    if (!midiState.current.exists()) {
      const select = $form.current.querySelector('[name="device"]') as HTMLSelectElement;
      select.value = '';
    }
  }, [midiState.current.exists()]);

  const devices = () => {
    return midiState.inputs.map(i => (
      <option value={i.id} key={i.id}>{i.name}</option>
    ));
  };

  const channelOptions = () => {
    return channels().map(c => (
      <option value={c} key={c}>Channel {c}</option>
    ));
  };

  return (
    <div className="input mb-2">
      <form id="midi" className="form" ref={$form}>
        <div className="row">
          <div className="col-12">
            <div className="form-e form-s">
              <label htmlFor="device">Device</label>
              <select id="device" name="device" onChange={updateMidi}>
                <option value={''}>None</option>
                {devices()}
              </select>
            </div>
          </div>
        </div>
        <div className="row align-end">
          <div className="col-9">
            <div className="form-e form-s">
              <label htmlFor="channel">Channel</label>
              <select id="channel" name="channel" onChange={clear}>
                {channelOptions()}
              </select>
            </div>
          </div>
          <div className="col-3">
            <div className="form-e">
              <label htmlFor="delay">Delay</label>
              <input id="delay" name="delay" placeholder="100ms" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
