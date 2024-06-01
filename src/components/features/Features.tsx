// import { FormEventHandler } from 'react';
// import {
//   faPlay,
//   faStop,
//   faBook,
//   faFileArrowDown,
//   faFileArrowUp,
//   faRotate,
// } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { loadPresenter, useMidi, useAction } from '../../../core/common/infrastructure/Locator';
// import { MaybeMidi } from '../../../core/midi/domain/Midi';
// import { usePresenter } from '../../hooks/use-ploc-state';
// import { formdataToObject } from '../../helpers/formdata';
import { Play } from './actions/play/Play';
import { Fetch } from './actions/fetch/Fetch';
import { Save } from './actions/save/Save';
import { Load } from './actions/load/Load';
import './Features.scss';

export function Features() {
  // const midiPresenter = loadPresenter(useMidi());
  // const actionPresenter = loadPresenter(useAction());
  // const midiState = usePresenter(midiPresenter);

  // const resetMidi = () => {
  //   const id = midiState.current.device?.id;
  //   if (id) midiPresenter.stopListening(id, true);
  // };

  // const formValues = () => {
  //   const form = document.querySelector('#midi') as HTMLFormElement;
  //   const data = new FormData(form);
  //   return formdataToObject<MaybeMidi>(data);
  // };

  // const submit: FormEventHandler = (e) => {
  //   e.preventDefault();

  //   if (!midiState.listening) {
  //     const values = formValues();
  //     actionPresenter.setDelay(values.delay);
  //     midiPresenter.listenInput([e => actionPresenter.sendKey(e)]);
  //   } else {
  //     resetMidi();
  //   }
  // };

  // const getInputs = () => {
  //   midiPresenter.getInputs();
  // };

  // const saveActions = () => {
  //   actionPresenter.saveActions();
  // };

  // const loadActions = () => {
  //   actionPresenter.loadActions();
  // };

  // const buttonDisabled = () => {
  //   return !midiState.current.exists();
  // };

  // const buttonClasses = () => {
  //   return `btn ${buttonDisabled() ? 'btn_disabled' : ''}`;
  // };

  // const buttonMessage = () => {
  //   return midiState.listening
  //     ? <FontAwesomeIcon icon={faStop} />
  //     : <FontAwesomeIcon icon={faPlay} />;
  // };

  return (
    <div className="features">
      <div className="row">
        <div className="col">
          <Play />
          <Fetch />
          <Save />
          <Load />
        </div>
      </div>
    </div>
  );
}
