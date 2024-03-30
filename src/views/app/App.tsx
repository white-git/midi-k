import { useRef, FormEventHandler } from 'react'
import { Input, InputRef } from '../../components/input/Input'
import { InputLog } from '../../components/input-log/InputLog'
import { Action } from '../../components/action/Action'
import { Features } from '../../components/features/Features'
import './App.scss'

export function App() {
  const $input = useRef<InputRef>()

  const play: FormEventHandler = (e) => {
    if ($input.current) {
      $input.current.submit(e)
    }
  }

  return (
    <div id="app">
      <div className="app-container container g-2">
        <Features play={play} />
        <div className="row">
          <div className="col-5">
            <div className="app-input">
              <Input ref={$input} />
              <Action />
            </div>
          </div>
          <div className="col-7">
            <div className="app-inputlog">
              <InputLog />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
