import { NoteMessageEvent } from 'webmidi'
import { Presenter } from '../../shared/infrastructure/Presenter'
import { ActionCall } from '../../action/domain/Action'
import { MidiObject } from '../domain/Midi'
import { MidiState, midiState } from '../domain/MidiState'
import { Midi } from '../domain/Midi'
import { MidiApplication } from '../MidiApplication'

export class MidiPresenter extends Presenter<MidiState> {
  constructor(
    private readonly application: MidiApplication
  ) {
    super(midiState)
  }

  public async getInputs() {
    const result = await this.application.getInputs()
    this.changeState({ inputs: result })
  }

  public stopListening(id: string, clean?: boolean) {
    this.application.stopListening(id)
    const { current } = this.state
    current.clearMessages()
    const state: Partial<MidiState> = {
      listening: false,
      current,
    }
    if (clean) state.current = Midi.empty()
    this.changeState(state)
  }

  public createMidi(data: MidiObject) {
    const midi = this.application.createMidi(data.device, data.channel)
    this.changeState({ current: midi })
  }

  public listenInput(listeners: ActionCall[] ) {
    const midi = this.state.current

    if (midi.device) {
      this.changeState({ listening: true })
      this.application.listenMessagesByInput(
        midi.device.id,
        midi.channel,
        (e: NoteMessageEvent) => {
          e.timestamp = Date.now()
          midi.messages.push(e)
          this.changeState({ current: midi })
          listeners.forEach(fn => fn(e))
        },
      )
    }
  }
}
