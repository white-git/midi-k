import { NoteMessageEvent } from 'webmidi'
import { ActionKeyConverter } from './infrastructure/ActionKeyConverter'
import { ActionIpc } from './infrastructure/ActionIpc'
import { Action } from './domain/Action'

export class ActionApplication {
  constructor(
    private actionKeyConverter: ActionKeyConverter,
    private actionIpc: ActionIpc,
  ) {}

  public createAction(message: NoteMessageEvent, keys: string[]) {
    const input = Action.generateId(message)
    const codes = this.actionKeyConverter.convert(keys)
    return Action.create(input, keys, codes)
  }

  public updateAction(action: Action, keys: string[]) {
    const codes = this.actionKeyConverter.convert(keys)
    action.setKeys(keys, codes)
    return action
  }

  public setDelay(delay: number) {
    this.actionIpc.emitDelay(delay)
  }

  public sendKey(action: Action) {
    this.actionIpc.emitKeys(action.codes)
  }
}
