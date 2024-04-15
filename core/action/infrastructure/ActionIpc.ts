import { IpcRenderer, IpcRendererEvent } from 'electron';
import { ActionLoadCall } from '../domain/Action';
import * as Channels from '../../constants/Channels';

export class ActionIpc {
  constructor(private ipc: IpcRenderer) {}

  public emitDelay(delay: number) {
    this.ipc.send(Channels.SET_DELAY, delay);
  }

  public emitKeys(codes: number[]) {
    this.ipc.send(Channels.SEND_KEY, codes);
  }

  public showDialog(loadFile: ActionLoadCall) {
    const callback = (_: IpcRendererEvent, value: string) => {
      loadFile(JSON.parse(value));
      this.ipc.off(Channels.LOAD_FILE, callback);
    };

    this.ipc.on(Channels.LOAD_FILE, callback);
    this.ipc.invoke(Channels.SHOW_DIALOG);
  }
}
