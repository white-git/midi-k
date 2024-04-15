import { Input, Output } from 'webmidi';
import { Midi } from '../domain/Midi';

export type MidiState = {
  inputs: Input[]
  outputs: Output[]
  current: Midi
  listening: boolean
};

export const midiInitialState: MidiState = {
  inputs: [],
  outputs: [],
  current: Midi.empty(),
  listening: false,
};
