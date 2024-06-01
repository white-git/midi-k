import { Input, Output, NoteMessageEvent, Note, Message } from 'webmidi';
import { Model } from '../../common/domain/Model';

export type Device = Input | Output | null;
export type MaybeMidi = Midi;
export const channels = Array.from({ length: 16 }, (_, i) => i + 1);

export class MidiEvent extends Model {
  public note: Note;
  public message: Message;
  public type: string;
  public timestamp: number;

  constructor(object: NoteMessageEvent) {
    super();
    this.note = object.note;
    this.message = object.message;
    this.type = object.type;
    this.timestamp = object.timestamp;
  }
}

export class Midi extends Model {
  public device: Device;
  public channel: number;
  public messages: MidiEvent[] = [];
  public listening: boolean;
  public delay: number;

  constructor(object: MaybeMidi) {
    super();
    this.device = object.device;
    this.channel = object.channel;
    this.listening = false;
    this.messages = [];
    this.delay = 100;
  }

  public clearMessages() {
    this.messages = [];
  }

  public setDevice(device: Device) {
    this.device = device;
  }

  public setDelay(delay: number) {
    this.delay = delay;
  }

  public setChannel(channel: number) {
    this.channel = channel;
  }

  public setListening(listening: boolean) {
    this.listening = listening;
  }

  public addEvent(n: NoteMessageEvent) {
    this.messages.unshift(new MidiEvent(n));
    if (this.messages.length >= 100) this.messages.splice(100);
  }

  public valid() {
    return this.device && this.channel;
  }
}
