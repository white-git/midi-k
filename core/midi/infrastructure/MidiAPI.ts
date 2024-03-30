import { WebMidi, Input, NoteMessageEvent } from 'webmidi'

type MidiBufferInput = {
  [k: string]: Input
}

export type MidiMessageCallback = {
  (r: NoteMessageEvent): void
}

export class MidiAPI {
  private inputs: MidiBufferInput = {}

  public async getInputs() {
    await WebMidi.enable()

    WebMidi.inputs.forEach(i => {
      this.inputs[i.id] = i
    })

    return WebMidi.inputs
  }

  public getInput(id: string) {
    return this.inputs[id]
  }

  public subscribe(id: string, channel: number, fn: MidiMessageCallback) {
    const input = WebMidi.getInputById(id)

    if (channel > 0) {
      const source = input.channels[channel]
      source.addListener('noteon', fn)
    } else {
      input.addListener('noteon', fn)
    }
  }

  public unsubscribe(id: string) {
    const input = WebMidi.getInputById(id)
    input.removeListener('noteon')
  }
}
