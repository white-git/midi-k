import { Ipc, IpcLoadFile } from '../common/infrastructure/Ipc';
import { Action, MaybeAction } from './domain/Action';
import { MidiEvent } from '../midi/domain/Midi';

type ActionLoadFile = {
  (a: MaybeAction[]): void
};

export class ActionApplication {
  constructor(
    private ipc: Ipc,
  ) {}

  public create(actions: Action[], event: MidiEvent) {
    const aux = actions.slice();
    const action = new Action(<MaybeAction>{});
    action.setId(event);
    if (!aux.some(a => a.id === action.id)) aux.unshift(action);
    return aux;
  }

  public setKeys(action: Action, value: string) {
    const keys = value.split('+');
    action.setKeys(keys);
  }

  public remove(actions: Action[], action: Action) {
    const aux = actions.slice();
    const idx = actions.findIndex(a => a.id === action.id);
    if (~idx) aux.splice(idx, 1);
    return aux;
  }

  public emitKey(action: Action) {
    this.ipc.emitKeys(action.keys);
  }

  public save(actions: Action[]) {
    const content = JSON.stringify(actions);
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = 'midi-k.actions.json';
    element.click();
  }

  public loadActions(loadFile: ActionLoadFile) {
    this.ipc.showDialog(<IpcLoadFile>loadFile);
  }
}
