import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { usePlocState } from '../../hooks/use-ploc-state';
import { plocContext } from '../../hooks/ploc-context';
import { Log } from './log/Log';
import './Logs.scss';

// TODO
// Display logs and create new actions when a new log is generated.
export function Logs() {
  const { midiPloc } = plocContext();
  const state = usePlocState(midiPloc);
  const isEmpty = !state.current.messages.length || !state.current.valid();

  const clear = () => {
    midiPloc.clearMessages();
  };

  const empty = () => {
    return (
      <div className="logs-empty">
        There's no event logs to display, select a device and click the play button
        to start listening for events.
      </div>
    );
  };

  const table = () => {
    return (
      <div className="logs-table">
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Channel</th>
              <th>Velocity</th>
              <th>Type</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {state.current.messages.map(m => (
              <Log event={m} key={m._id} />
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="logs">
      <div className="row justify-end">
        <div className="col">
          <div className="logs-actions">
            <button className="button logs-button" disabled={isEmpty} onClick={clear}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      </div>
      {isEmpty ? empty() : table()}
    </div>
  );
}
