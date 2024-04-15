import { NoteMessageEvent } from 'webmidi';
import { Model } from '../../common/domain/Model';

export type ActionCall = {
  (m: NoteMessageEvent): void
};

export type ActionLoadCall = {
  (a: Action[]): void
};

export type MaybeAction = {
  input: string
  keys: string[]
  codes: number[]
};

export class Action extends Model {
  public input: string;
  public keys: string[];
  public codes: number[];
  public timestamp: number;

  constructor(input: string, keys: string[], codes: number[]) {
    super();
    this.input = input;
    this.keys = keys;
    this.codes = codes;
    this.timestamp = Date.now();
    this.id = this.id + '.' + this.timestamp;
  }

  public formatKeys() {
    return this.keys.join('+');
  }

  public setKeys(keys: string[], codes: number[]) {
    this.keys = keys;
    this.codes = codes;
  }

  public exists() {
    return !!this.input;
  }

  public static generateId(message: NoteMessageEvent) {
    return `${message.note.identifier}-CH${message.message.channel}`;
  }

  public static create(input: string, keys: string[], codes: number[]) {
    return new this(input, keys, codes);
  }

  public static empty() {
    return new this('', [], []);
  }
}
