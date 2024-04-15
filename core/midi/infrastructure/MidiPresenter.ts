import { NoteMessageEvent } from 'webmidi';
import { MidiAPI } from './MidiAPI';
import { Presenter } from '../../common/infrastructure/Presenter';
import { ActionCall } from '../../action/domain/Action';
import { MaybeMidi } from '../domain/Midi';
import { MidiState, midiInitialState } from './MidiState';
import { Midi } from '../domain/Midi';
import { MidiApplication } from '../MidiApplication';

export class MidiPresenter extends Presenter<MidiState> {
  constructor(
    private readonly application: MidiApplication
  ) {
    super(midiInitialState);
  }

  public async getInputs() {
    const result = await this.application.getInputs();
    this.changeState({ inputs: result });
  }

  public stopListening(id: string, clean?: boolean) {
    this.application.stopListening(id);
    const { current } = this.state;
    current.clearMessages();
    const state: Partial<MidiState> = {
      listening: false,
      current,
    };
    if (clean) state.current = Midi.empty();
    this.changeState(state);
  }

  public createMidi(data: MaybeMidi) {
    const midi = this.application.createMidi(data.device, data.channel);
    this.changeState({ current: midi });
  }

  public listenInput(listeners: ActionCall[] ) {
    const midi = this.state.current;

    if (midi.device) {
      this.changeState({ listening: true });
      this.application.listenMessagesByInput(
        midi.device.id,
        midi.channel,
        (e: NoteMessageEvent) => {
          e.timestamp = Date.now();
          midi.messages.unshift(e);

          // Avoid to collect a lot of log entries. Not sure if it could cause a
          // performance issue. Just being careful.
          if (midi.messages.length > 100) {
            midi.messages = midi.messages.slice(0, 100);
          }

          this.changeState({ current: midi });
          listeners.forEach(fn => fn(e));
        },
      );
    }
  }

  public static use() {
    const midiApi = new MidiAPI();
    const application = new MidiApplication(midiApi);
    return new this(application);
  }
}
