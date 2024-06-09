import { spawnSync } from 'child_process';

type Platform = {
  send: { (k: string): string[] }
};

export class Robot {
  public platform?: Platform;

  constructor() {
    this.setPlatform();
  }

  async setPlatform() {
    switch (process.platform) {
      case 'darwin': {
        this.platform = await import('./darwin');
        break;
      }
      case 'win32': {
        this.platform = await import('./win32');
        break;
      }
      default: {
        throw new Error('Unknown platform');
      }
    }
  }

  cmd(args: string[]) {
    const app = args.slice().shift();
    const params = args.slice(1);

    if (app) {
      const { stdout, stderr, status } = spawnSync(app, params);
      if (status !== 0) throw stderr;
      return stdout;
    }
  }

  send(key: string) {
    try {
      const command = this.platform?.send(key);
      if (command) this.cmd(command);
    } catch (e) {
      console.log(e?.toString());
    }
  }

  static start() {
    return new this();
  }
}
