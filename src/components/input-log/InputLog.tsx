import { NoteMessageEvent } from 'webmidi';
import { loadPresenter, useMidi, useAction } from '../../../core/common/infrastructure/Locator';
import { usePresenter } from '../../hooks/use-presenter';
import './InputLog.scss';

export function InputLog() {
  const midiPresenter = loadPresenter(useMidi());
  const actionPresenter = loadPresenter(useAction());
  const midiState = usePresenter(midiPresenter);

  const empty = () => {
    return !midiState.current.hasMessages() && (
      <p className="inputlog-empty mt-3 text-black">
        Here will be displayed all the note on events sent by the midi device
        once the app it's started.
      </p>
    );
  };

  const createAction = (m: NoteMessageEvent) => {
    return () => {
      actionPresenter.createAction(m);
    };
  };

  const logs = () => {
    return midiState.current.messages.map(m => (
      <tr key={m.timestamp} onClick={createAction(m)}>
        <td>{m.note.identifier}</td>
        <td>{m.note.rawAttack}</td>
        <td>CH {m.message.channel}</td>
        <td>{m.type}</td>
      </tr>
    ));
  };

  return (
    <div className="inputlog br-1">
      <h3 className="inputLog-title mb-1">Logs</h3>
      <table className="table">
        <thead>
          <tr>
            <th>name</th>
            <th>vel</th>
            <th>channel</th>
            <th>event</th>
          </tr>
        </thead>
        <tbody>
          {logs()}
        </tbody>
      </table>
      {empty()}
    </div>
  );
}
