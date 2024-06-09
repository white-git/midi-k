import { NoteMessageEvent } from 'webmidi';
import { Ploc } from '../../common/infrastructure/Ploc';
import { ActionApplication } from '../ActionApplication';
import { ActionState, actionInitialState } from './ActionState';
import { Action, MaybeAction } from '../domain/Action';
import { Ipc } from '../../common/infrastructure/Ipc';
import { MidiEvent } from '../../midi/domain/Midi';

export class ActionPloc extends Ploc<ActionState> {
  constructor(private readonly application: ActionApplication) {
    super(actionInitialState());
  }

  public calls() {
    const actions = this.state.actions.filter(a => a.valid());

    return actions.map(a => (n: NoteMessageEvent) => {
      const event = new MidiEvent(n);
      const id = Action.createId(event);
      if (a.id === id) this.application.emitKey(a);
    });
  }

  public create(event: MidiEvent) {
    const actions = this.application.create(this.state.actions, event);
    this.changeState({ actions });
  }

  public setKeys(action: Action, value: string) {
    this.application.setKeys(action, value);
    this.changeState({ ...this.state });
  }

  public remove(action: Action) {
    const actions = this.application.remove(this.state.actions, action);
    this.changeState({ actions });
  }

  public save() {
    this.application.save(this.state.actions);
  }

  public load() {
    this.application.loadActions((objects: MaybeAction[]) => {
      const actions = objects.map(a => new Action(a));
      this.changeState({ actions });
    });
  }

  public static use() {
    const actionIpc = new Ipc();
    const application = new ActionApplication(actionIpc);
    return new this(application);
  }
}
