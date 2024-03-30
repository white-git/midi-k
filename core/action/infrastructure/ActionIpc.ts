import { IpcRenderer } from 'electron'
import * as Channels from '../../constants/Channels'

export class ActionIpc {
  constructor(private ipc: IpcRenderer) {}

  public emitDelay(delay: number) {
    this.ipc.send(Channels.SET_DELAY, delay)
  }

  public emitKeys(codes: number[]) {
    this.ipc.send(Channels.SEND_KEY, codes)
  }
}
