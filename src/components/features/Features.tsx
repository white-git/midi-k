import { useEffect } from 'react';
import { Play } from './actions/play/Play';
import { Fetch } from './actions/fetch/Fetch';
import { Save } from './actions/save/Save';
import { Load } from './actions/load/Load';
import { usePloc } from '../../hooks/ploc-context';
import './Features.scss';

export function Features() {
  const { midiPloc } = usePloc();

  useEffect(() => {
    midiPloc.getInputs();
  }, []);

  return (
    <div className="features">
      <div className="row">
        <div className="col">
          <Play />
          <Fetch />
          <Save />
          <Load />
        </div>
      </div>
    </div>
  );
}
