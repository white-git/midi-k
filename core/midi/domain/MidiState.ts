import { Input, Output } from 'webmidi'
import { Midi } from './Midi'

export type MidiState = {
  inputs: Input[]
  outputs: Output[]
  current: Midi
  listening: boolean
}

export const midiState: MidiState = {
  inputs: [],
  outputs: [],
  current: Midi.empty(),
  listening: false,
}
