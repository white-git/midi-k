import { NoteMessageEvent } from 'webmidi';
import { MidiAPI } from './MidiAPI';
import { Ploc } from '../../common/infrastructure/Ploc';
import { Ipc } from '../../common/infrastructure/Ipc';
import { ActionCall } from '../../action/domain/Action';
import { MaybeMidi } from '../domain/Midi';
import { MidiState, midiInitialState } from './MidiState';
import { Midi } from '../domain/Midi';
import { MidiApplication } from '../MidiApplication';

export class MidiPloc extends Ploc<MidiState> {
  constructor(private readonly application: MidiApplication) {
    super(midiInitialState());
  }

  public async getInputs() {
    try {
      this.changeState({ kind: 'LoadingMidiState' });
      const inputs = await this.application.getInputs();
      this.changeState({
        kind: 'LoadedMidiState',
        inputs,
      });
    } catch (e) {
      this.changeState({
        kind: 'ErrorMidiState',
        error: e as Error,
      });
    }
  }

  public setDevice(id: string) {
    const device = this.application.getDevice(id);
    this.state.current.setDevice(device);
    this.changeState({});
  }

  public setChannel(channel: number) {
    this.state.current.setChannel(channel);
    this.changeState({});
  }

  public clearDevice() {
    const current = new Midi(<MaybeMidi>{});
    current.channel = this.state.current.channel;
    this.changeState({ current });
  }

  public clearMessages() {
    this.state.current.clearMessages();
    this.changeState({});
  }

  public setDelay(delay: number) {
    this.state.current.setDelay(delay);
    this.application.setDelay(delay);
    this.changeState({});
  }

  public play(calls: { (): ActionCall[] }) {
    const midi = this.state.current;
    this.state.current.setListening(true);
    this.changeState({});

    if (midi.valid()) {
      this.application.play(
        <string>midi.device?.id,
        midi.channel,
        (n: NoteMessageEvent) => {
          midi.addEvent(n);
          this.changeState({});
          calls().forEach(call => call(n));
        },
      );
    }
  }

  public stop() {
    const midi = this.state.current;
    this.state.current.setListening(false);
    this.application.stop(<string>midi.device?.id);
    this.changeState({});
  }

  public static instance: MidiPloc;

  public static use() {
    if (!this.instance) {
      const midiApi = new MidiAPI();
      const ipc = new Ipc();
      const application = new MidiApplication(midiApi, ipc);
      this.instance = new this(application);
    }

    return this.instance;
  }
}
