import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { InputText } from '../../inputs/text/Text';
import { Action as ActionModel } from '../../../../core/action/domain/Action';
import { plocContext } from '../../../hooks/ploc-context';

type ActionProps = {
  action: ActionModel;
};

export function Action({ action }: ActionProps) {
  const { actionPloc } = plocContext();

  const remove = () => {
    actionPloc.remove(action);
  };

  const update = () => {
    let timeout = 0;

    return (value: string) => {
      clearTimeout(timeout);

      timeout = window.setTimeout(() => {
        actionPloc.setKeys(action, value);
      }, 500);
    };
  };

  return (
    <tr key={action.id}>
      <td>{action.id}</td>
      <td>
        <InputText
          name={action.id}
          placeholder="Key"
          classes={['input_reset']}
          onInput={update()}
          defaultValue={action.value()}
        />
      </td>
      <td>
        <button className="button" onClick={remove}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  );
}
