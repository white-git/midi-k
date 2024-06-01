import { MidiAPI, MidiMessageCallback } from './infrastructure/MidiAPI';
import { Ipc } from '../common/infrastructure/Ipc';
// import { Midi, MaybeMidi } from './domain/Midi';

export class MidiApplication {
  constructor(
    private readonly midiApi: MidiAPI,
    private readonly ipc: Ipc,
  ) {}

  public getInputs() {
    return this.midiApi.getInputs();
  }

  public getDevice(id: string) {
    return this.midiApi.getInput(id);
  }

  public setDelay(delay: number) {
    this.ipc.emitDelay(delay);
  }

  public play(id: string, channel: number, update: MidiMessageCallback) {
    this.midiApi.subscribe(id, channel, update);
  }

  public stop(id: string) {
    this.midiApi.unsubscribe(id);
  }

  // public createMidi(id: string, channel: number) {
  //   const input = this.midiApi.getInput(id);
  //   return new Midi(input, channel);
  // }

  // public listenMessagesByInput(id: string, channel: number, fn: MidiMessageCallback) {
  //   this.midiApi.subscribe(id, channel, fn);
  // }

  // public stopListening(id: string) {
  //   this.midiApi.unsubscribe(id);
  // }
}
