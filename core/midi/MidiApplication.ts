import { MidiAPI, MidiMessageCallback } from './infrastructure/MidiAPI'
import { Midi } from './domain/Midi'

export class MidiApplication {
  constructor(
    private readonly midiApi: MidiAPI,
  ) {}

  public getInputs() {
    return this.midiApi.getInputs()
  }

  public createMidi(id: string, channel: number) {
    const input = this.midiApi.getInput(id)
    return Midi.create(input, channel)
  }

  public listenMessagesByInput(id: string, channel: number, fn: MidiMessageCallback) {
    this.midiApi.subscribe(id, channel, fn)
  }

  public stopListening(id: string) {
    this.midiApi.unsubscribe(id)
  }
}
