import { Input, Output, NoteMessageEvent } from 'webmidi';
import { Model } from '../../common/domain/Model';

export type Device = Input | Output | null;

export type MaybeMidi = {
  device: string
  channel: number
  delay: number
};

export class Midi extends Model {
  public device: Device;
  public channel: number;
  public messages: NoteMessageEvent[] = [];

  constructor(device: Device, channel: number) {
    super();
    this.device = device;
    this.channel = channel;
    this.messages = [];
  }

  public clearMessages() {
    this.messages = [];
  }

  public exists() {
    return !!this.device;
  }

  public hasMessages() {
    return !!this.messages.length;
  }

  public static create(device: Device, channel: number) {
    return new this(device, channel);
  }

  public static empty() {
    return new this(null, 0);
  }
}
