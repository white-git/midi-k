import { FormEvent } from 'react'
import { faPlay, faStop, faBook, faFileArrowDown, faFileArrowUp, faRotate } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dependecy, useMidi } from '../../../core/shared/infrastructure/Dependecy'
import { usePresenter } from '../../hooks/use-presenter'

import './Features.scss'

type FeaturesProps = {
  play: { (e: FormEvent): void }
}

export function Features({ play }: FeaturesProps) {
  const midiPresenter = Dependecy.use(useMidi())
  const midiState = usePresenter(midiPresenter)

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
            onClick={play}
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
