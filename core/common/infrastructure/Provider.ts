import { MidiPloc } from '../../midi/infrastructure/MidiPloc';
import { ActionPloc } from '../../action/infrastructure/ActionPloc';

export const midiPloc = MidiPloc.use();
export const actionPloc = ActionPloc.use();
