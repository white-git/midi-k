import { spawnSync } from 'child_process';

type Platform = {
  send: { (k: string): string[] }
  load: { (): void }
};

export class Robot {
  public platform!: Platform;

  constructor() {
    this.loadPlatform();
    this.afterLoadPlatform();
  }

  private async loadPlatform() {
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

  private afterLoadPlatform() {
    this.platform.load();
  }

  private cmd(args: string[]) {
    const app = args.slice().shift();
    const params = args.slice(1);

    if (app) {
      const { stdout, stderr, status } = spawnSync(app, params);
      if (status !== 0) throw stderr;
      return stdout;
    }
  }

  public send(key: string) {
    try {
      this.cmd(this.platform.send(key));
    } catch (e) {
      console.log(e?.toString());
    }
  }

  public static start() {
    return new this();
  }
}
