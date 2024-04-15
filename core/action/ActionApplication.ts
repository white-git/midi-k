import { NoteMessageEvent } from 'webmidi';
import { ActionKeyConverter } from './infrastructure/ActionKeyConverter';
import { ActionLoadCall } from './domain/Action';
import { ActionIpc } from './infrastructure/ActionIpc';
import { Action } from './domain/Action';

export class ActionApplication {
  constructor(
    private actionKeyConverter: ActionKeyConverter,
    private actionIpc: ActionIpc,
  ) {}

  public createAction(message: NoteMessageEvent, keys: string[]) {
    const input = Action.generateId(message);
    const codes = this.actionKeyConverter.convert(keys);
    return Action.create(input, keys, codes);
  }

  public updateAction(action: Action, keys: string[]) {
    const codes = this.actionKeyConverter.convert(keys);
    action.setKeys(keys, codes);
    return action;
  }

  public setDelay(delay: number) {
    this.actionIpc.emitDelay(delay);
  }

  public sendKey(action: Action) {
    this.actionIpc.emitKeys(action.codes);
  }

  public saveActions(actions: Action[]) {
    const content = JSON.stringify(actions);
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = 'actions.json';
    element.click();
  }

  public loadActions(loadFile: ActionLoadCall) {
    this.actionIpc.showDialog(loadFile);
  }
}
