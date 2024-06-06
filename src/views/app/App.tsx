import { Actions } from '../../components/actions/Actions';
import { Features } from '../../components/features/Features';
import { Control } from '../../components/control/Control';
import { Logs } from '../../components/logs/Logs';
import { PlocContext } from '../../hooks/ploc-context';
import * as providers from '../../../core/common/infrastructure/Provider';
import './App.scss';

export function App() {
  return (
    <PlocContext.Provider value={providers}>
      <div id="app" className="container">
        <Features />
        <div className="row app-container">
          <div className="col-4 app-left">
            <Control />
            <Actions />
          </div>
          <div className="col-8 app-right">
            <Logs />
          </div>
        </div>
      </div>
    </PlocContext.Provider>
  );
}
