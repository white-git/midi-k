import { Input, Output } from 'webmidi';
import { Midi, MaybeMidi } from '../domain/Midi';

type CommonMidiState = {
  current: Midi;
};

type LoadingMidiState = {
  kind: 'LoadingMidiState'
};

type LoadedMidiState = {
  kind: 'LoadedMidiState';
  inputs: Input[];
  outputs: Output[];
};

type ErrorMidiState = {
  kind: 'ErrorMidiState';
  error: Error;
};

export type MidiState = (LoadingMidiState | LoadedMidiState | ErrorMidiState) & CommonMidiState;

export const midiInitialState = (): MidiState => ({
  kind: 'LoadedMidiState',
  inputs: [],
  outputs: [],
  current: new Midi(<MaybeMidi>{}),
});
