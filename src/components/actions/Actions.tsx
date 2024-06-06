import { Action } from './action/Action';
import { usePloc } from '../../hooks/ploc-context';
import { usePlocState } from '../../hooks/use-ploc-state';
import './Actions.scss';

export function Actions() {
  const { actionPloc } = usePloc();
  const state = usePlocState(actionPloc);
  const isEmpty = !state.actions.length;

  const empty = () => {
    return (
      <div className="actions-empty">
        There's no actions, click on an event log to create one.
      </div>
    );
  };

  const table = () => {
    return (
      <div className="actions-table">
        <table>
          <tbody>
            {state.actions.map(a => (
              <Action action={a} key={a.id} />
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="actions">
      <div className="row">
        <div className="col-12">
          {isEmpty ? empty() : table()}
        </div>
      </div>
    </div>
  );
}
