import { FormEventHandler } from 'react'
import { faPlay, faStop, faBook, faFileArrowDown, faFileArrowUp, faRotate } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dependecy, useMidi, useAction } from '../../../core/shared/infrastructure/Dependecy'
import { MidiObject } from '../../../core/midi/domain/Midi'
import { usePresenter } from '../../hooks/use-presenter'
import { formdataToObject } from '../../helpers/formdata'

import './Features.scss'

export function Features() {
  const midiPresenter = Dependecy.use(useMidi())
  const actionPresenter = Dependecy.use(useAction())
  const midiState = usePresenter(midiPresenter)

  const resetMidi = () => {
    const id = midiState.current.device?.id
    if (id) midiPresenter.stopListening(id, true)
  }

  const formValues = () => {
    const form = document.querySelector('#midi') as HTMLFormElement
    const data = new FormData(form)
    return formdataToObject<MidiObject>(data)
  }

  const submit: FormEventHandler = (e) => {
    e.preventDefault()

    if (!midiState.listening) {
      const values = formValues()
      actionPresenter.setDelay(values.delay)
      midiPresenter.listenInput([e => actionPresenter.sendKey(e)])
    } else {
      resetMidi()
    }
  }

  const getInputs = () => {
    midiPresenter.getInputs()
  }

  const buttonDisabled = () => {
    return !midiState.current.exists()
  }

  const buttonClasses = () => {
    return `btn ${buttonDisabled() ? 'btn_disabled' : ''}`
  }

  const buttonMessage = () => {
    return midiState.listening
      ? <FontAwesomeIcon icon={faStop} />
      : <FontAwesomeIcon icon={faPlay} />
  }

  return (
    <div className="features bg-yellow pl-2 pr-2 pt-1 pb-1">
      <div className="row">
        <div className="col">
          <button
            onClick={submit}
            className={buttonClasses()}
            disabled={buttonDisabled()}
          >
            {buttonMessage()}
          </button>
        </div>
        <div className="col">
          <button className="btn" onClick={getInputs}>
            <FontAwesomeIcon icon={faRotate} />
          </button>
        </div>
        <div className="col">
          <button className="btn btn_disabled">
            <FontAwesomeIcon icon={faBook} />
          </button>
        </div>
        <div className="col">
          <button className="btn btn_disabled">
            <FontAwesomeIcon icon={faFileArrowUp} />
          </button>
        </div>
        <div className="col">
          <button className="btn btn_disabled">
            <FontAwesomeIcon icon={faFileArrowDown} />
          </button>
        </div>
      </div>
    </div>
  )
}
