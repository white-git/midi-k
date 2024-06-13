import { IpcMain } from 'electron';
import * as Channels from '../core/constants/Channels';

export function startRobot(ipc: IpcMain) {
  ipc.on(Channels.SEND_KEY, (_, value: number[]) => {
    require('nutjs')(value);
  });

  // ipc.on(Channels.SET_DELAY, (_, value: number) => {
  //   delay = value;
  // });
}
