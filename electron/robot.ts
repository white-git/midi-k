import { Robot } from './automation';
import { IpcMain } from 'electron';
import * as Channels from '../core/constants/Channels';

export function startRobot(ipc: IpcMain) {
  const robot = Robot.start();

  ipc.on(Channels.SEND_KEY, (_, value: string[]) => {
    robot.send(value[0]);
  });

  // ipc.on(Channels.SET_DELAY, (_, value: number) => {
  //   delay = value;
  // });
}
