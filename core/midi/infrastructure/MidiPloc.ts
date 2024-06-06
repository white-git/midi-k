import { NoteMessageEvent, Input } from 'webmidi';
import { MidiAPI } from './MidiAPI';
import { Ploc } from '../../common/infrastructure/Ploc';
import { Ipc } from '../../common/infrastructure/Ipc';
import { ActionCall } from '../../action/domain/Action';
import { MidiState, midiInitialState } from './MidiState';
import { MidiApplication } from '../MidiApplication';

export class MidiPloc extends Ploc<MidiState> {
  constructor(private readonly application: MidiApplication) {
    super(midiInitialState());
  }

  public async getInputs() {
    try {
      this.changeState({
        ...this.state,
        kind: 'LoadingMidiState',
      });
      const inputs = await this.application.getInputs();
      this.changeState(this.update(inputs));
    } catch (e) {
      this.changeState({
        kind: 'ErrorMidiState',
        error: e as Error,
        current: this.state.current,
      });
    }
  }

  public setDevice(id: string) {
    const device = this.application.getDevice(id);
    this.state.current.setDevice(device);
    this.changeState({ ...this.state });
  }

  public setChannel(channel: number) {
    this.state.current.setChannel(channel);
    this.changeState({ ...this.state });
  }

  public clearDevice() {
    this.state.current.reset();
    this.changeState({ ...this.state });
  }

  public clearMessages() {
    this.state.current.clearMessages();
    this.changeState({ ...this.state });
  }

  public setDelay(delay: number) {
    this.state.current.setDelay(delay);
    this.application.setDelay(delay);
    this.changeState({ ...this.state });
  }

  public play(calls: { (): ActionCall[] }) {
    const midi = this.state.current;
    this.state.current.setListening(true);
    this.changeState({ ...this.state });

    if (midi.valid()) {
      this.application.play(
        <string>midi.device?.id,
        midi.channel,
        (n: NoteMessageEvent) => {
          midi.addEvent(n);
          this.changeState({ ...this.state });
          calls().forEach(call => call(n));
        },
      );
    }
  }

  public stop() {
    const midi = this.state.current;
    this.state.current.setListening(false);
    this.application.stop(<string>midi.device?.id);
    this.changeState({ ...this.state });
  }

  public update(inputs: Input[]): MidiState {
    const midi = this.state.current;
    this.application.stop(<string>midi.device?.id);
    this.state.current.reset();
    return {
      kind: 'UpdatedMidiState',
      outputs: [],
      current: this.state.current,
      inputs,
    };
  }

  public static use() {
    const midiApi = new MidiAPI();
    const ipc = new Ipc();
    const application = new MidiApplication(midiApi, ipc);
    return new this(application);
  }
}
