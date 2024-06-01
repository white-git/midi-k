import { MidiEvent } from '../../../../core/midi/domain/Midi';
import { plocContext } from '../../../hooks/ploc-context';

type LogProps = {
  event: MidiEvent;
};

export function Log({ event }: LogProps) {
  const { actionPloc } = plocContext();

  const create = () => {
    actionPloc.create(event);
  };

  return (
    <tr onClick={create}>
      <td>{event.note.identifier}</td>
      <td>{event.message.channel}</td>
      <td>{event.note.rawAttack}</td>
      <td>{event.type}</td>
      <td>{event.timestamp}</td>
    </tr>
  );
}
