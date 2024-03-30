import { useEffect, FormEventHandler, useRef } from 'react'
import { usePresenter } from '../../hooks/use-presenter'
import { formdataToObject } from '../../../core/shared/domain/Helpers'
import { Dependecy, useMidi, useAction } from '../../../core/shared/infrastructure/Dependecy'
import { MidiObject } from '../../../core/midi/domain/Midi'
import './Input.scss'

export function Input() {
  const midiPresenter = Dependecy.use(useMidi())
  const actionPresenter = Dependecy.use(useAction())
  const midiState = usePresenter(midiPresenter)
  const $form = useRef<HTMLFormElement>(document.createElement('form'))

  const resetMidi = (value?: string) => {
    const id = midiState.current.device?.id
    if (id) midiPresenter.stopListening(id, value === '')
  }

  const formValues = () => {
    const form = $form.current
    const data = new FormData(form)
    return formdataToObject<MidiObject>(data)
  }

  const updateMidi: FormEventHandler = (e) => {
    const { value } = e.target as HTMLSelectElement
    resetMidi(value)
    const data = formValues()
    midiPresenter.createMidi(data)
  }

  const reset = () => {
    resetMidi()
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

  const channels = () => {
    return Array.from({ length: 16 }, (_, i) => i + 1)
  }

  useEffect(() => {
    midiPresenter.getInputs()
  }, [])

  useEffect(() => {
    if (!midiState.current.exists()) {
      const select = $form.current.querySelector('[name="device"]') as HTMLSelectElement
      select.value = ''
    }
  }, [midiState.current.exists()])

  const devices = () => {
    return midiState.inputs.map(i => (
      <option value={i.id} key={i.id}>{i.name}</option>
    ))
  }

  const channelOptions = () => {
    return channels().map(c => (
      <option value={c} key={c}>Channel {c}</option>
    ))
  }

  const buttonDisabled = () => {
    return !midiState.current.exists()
  }

  const buttonClasses = () => {
    return `btn ${buttonDisabled() ? 'btn_disabled' : ''}`
  }

  const buttonMessage = () => {
    return midiState.listening ? 'Stop' : 'Start'
  }

  return (
    <div className="input mb-2">
      <form className="form" ref={$form} onSubmit={submit}>
        <div className="row">
          <div className="col-9">
            <div className="form-e form-s">
              <label htmlFor="device">Device</label>
              <select id="device" name="device" onChange={updateMidi}>
                <option value={''}>None</option>
                {devices()}
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
        <div className="row align-end">
          <div className="col-12">
            <div className="form-e form-s">
              <label htmlFor="channel">Channel</label>
              <select id="channel" name="channel" onChange={reset}>
                {channelOptions()}
              </select>
            </div>
          </div>
          <div className="col">
            <button
              type="submit"
              className={buttonClasses()}
              disabled={buttonDisabled()}
            >
              {buttonMessage()}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
