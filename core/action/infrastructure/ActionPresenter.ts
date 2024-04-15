import { NoteMessageEvent } from 'webmidi';
import { Presenter } from '../../common/infrastructure/Presenter';
import { ActionApplication } from '../ActionApplication';
import { ActionState, actionInitialState } from './ActionState';
import { Action, MaybeAction } from '../domain/Action';
import { ActionKeyConverter } from './ActionKeyConverter';
import { ActionIpc } from './ActionIpc';

const { ipcRenderer } = window;

export class ActionPresenter extends Presenter<ActionState> {
  constructor(private readonly application: ActionApplication) {
    super(actionInitialState);
  }

  private findAction(input: string) {
    return this.state.actions.find(a => a.input === input);
  }

  public createAction(message: NoteMessageEvent) {
    const result = this.application.createAction(message, []);

    if (!this.findAction(result.input)) {
      const actions = this.state.actions.slice();
      actions.push(result);
      this.changeState({ actions });
    }
  }

  public updateActionKeys(input: string, keys: string) {
    const action = this.findAction(input);

    if (action) {
      const actions = this.state.actions.slice();
      const i = actions.indexOf(action);
      const result = this.application.updateAction(action, keys.split('+'));
      actions.splice(i, 1, result);
      this.changeState({ actions });
    }
  }

  public setDelay(delay: number) {
    if (delay !== undefined && typeof delay === "number") {
      this.application.setDelay(delay);
    }
  }

  public sendKey(message: NoteMessageEvent) {
    const input = Action.generateId(message);
    const action = this.findAction(input);
    if (action) this.application.sendKey(action);
  }

  public removeAction(action: Action) {
    const actions = this.state.actions.slice();
    const i = actions.indexOf(action);
    if (~i) actions.splice(i, 1);
    this.changeState({ actions });
  }

  public saveActions() {
    this.application.saveActions(this.state.actions);
  }

  public loadActions() {
    this.application.loadActions((objects: MaybeAction[]) => {
      const actions = objects.map(a => Action.create(a.input, a.keys, a.codes));
      this.changeState({ actions });
    });
  }

  public static use() {
    const actionKeyConverter = new ActionKeyConverter();
    const actionIpc = new ActionIpc(ipcRenderer);
    const application = new ActionApplication(actionKeyConverter, actionIpc);
    return new this(application);
  }
}
