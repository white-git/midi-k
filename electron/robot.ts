import { IpcMain } from 'electron';
import * as Channels from '../core/constants/Channels';

export function startRobot(ipc: IpcMain) {
  const { keyboard } = require('nutjs');

  keyboard.config.autoDelayMs = 100;

  ipc.on(Channels.SEND_KEY, async (_, value: number[]) => {
    await keyboard.pressKey(...value);
    await keyboard.releaseKey(...value);
  });

  ipc.on(Channels.SET_DELAY, (_, value: number) => {
    keyboard.config.autoDelayMs = value;
  });
}
