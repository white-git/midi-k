import { ActionApplication } from '../ActionApplication'
import { ActionPresenter } from './ActionPresenter'
import { ActionKeyConverter } from './ActionKeyConverter'
import { ActionIpc } from './ActionIpc'

const { ipcRenderer } = window

export class ActionProvider {
  public use() {
    const actionKeyConverter = new ActionKeyConverter()
    const actionIpc = new ActionIpc(ipcRenderer)
    const application = new ActionApplication(actionKeyConverter, actionIpc)
    return new ActionPresenter(application)
  }
}
