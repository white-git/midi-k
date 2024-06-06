import { IpcRenderer, IpcRendererEvent } from 'electron';
import * as Channels from '../../constants/Channels';

export type IpcLoadFile = {
  (json: object): void;
};

export class Ipc {
  private ipc: IpcRenderer;

  constructor() {
    this.ipc = window.ipcRenderer;
  }

  public emitDelay(delay: number) {
    this.ipc.send(Channels.SET_DELAY, delay);
  }

  public emitKeys(codes: number[]) {
    this.ipc.send(Channels.SEND_KEY, codes);
  }

  public showDialog(loadfile: IpcLoadFile) {
    const callback = (_: IpcRendererEvent, value: string) => {
      loadfile(JSON.parse(value));
      this.ipc.off(Channels.LOAD_FILE, callback);
    };

    this.ipc.on(Channels.LOAD_FILE, callback);
    this.ipc.invoke(Channels.SHOW_DIALOG);
  }
}
