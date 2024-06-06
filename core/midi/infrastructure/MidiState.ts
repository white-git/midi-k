import { Input, Output } from 'webmidi';
import { Midi, MaybeMidi } from '../domain/Midi';

type CommonMidiState = {
  current: Midi;
};

type LoadingMidiState = {
  kind: 'LoadingMidiState'
};

type UpdatedMidiState = {
  kind: 'UpdatedMidiState';
  inputs: Input[];
  outputs: Output[];
};

type ErrorMidiState = {
  kind: 'ErrorMidiState';
  error: Error;
};

export type MidiState = (LoadingMidiState | UpdatedMidiState | ErrorMidiState) & CommonMidiState;

export const midiInitialState = (): MidiState => ({
  kind: 'UpdatedMidiState',
  inputs: [],
  outputs: [],
  current: new Midi(<MaybeMidi>{}),
});
