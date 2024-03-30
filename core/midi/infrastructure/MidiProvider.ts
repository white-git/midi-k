import { MidiAPI } from './MidiAPI'
import { MidiApplication } from '../MidiApplication'
import { MidiPresenter } from './MidiPresenter'

export class MidiProvider {
  public use() {
    const midiApi = new MidiAPI()
    const application = new MidiApplication(midiApi)
    return new MidiPresenter(application)
  }
}
