import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { usePloc } from '../../../../hooks/ploc-context';

export function Load() {
  const { actionPloc } = usePloc();

  const load = () => {
    actionPloc.load();
  };

  return (
    <button className="button features-button" onClick={load}>
      <FontAwesomeIcon icon={faFileArrowDown} />
    </button>
  );
}
