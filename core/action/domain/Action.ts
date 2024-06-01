import { NoteMessageEvent } from 'webmidi';
import { Model } from '../../common/domain/Model';
import { MidiEvent } from '../../midi/domain/Midi';

export type ActionCall = {
  (n: NoteMessageEvent): void
};

export type MaybeAction = Action;

export class Action extends Model {
  public id: string;
  public keys: string[];
  public codes: number[];
  public timestamp: number;

  constructor(object: MaybeAction) {
    super();
    this.id = object.id;
    this.keys = object.keys || [];
    this.codes = object.codes || [];
    this.timestamp = Date.now();
  }

  public setKeys(keys: string[], codes: number[]) {
    this.keys = keys;
    this.codes = codes;
  }

  public setId(message: MidiEvent) {
    this.id = Action.createId(message);
  }

  public value() {
    return this.keys.join('+');
  }

  public valid() {
    return this.id && this.keys.length && this.codes.length;
  }

  public static createId(message: MidiEvent) {
    return `CH${message.message.channel}-${message.note.identifier}`;
  }
}
