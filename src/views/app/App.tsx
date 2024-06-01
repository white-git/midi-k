import { Actions } from '../../components/actions/Actions';
import { Features } from '../../components/features/Features';
import { Control } from '../../components/control/Control';
import { Logs } from '../../components/logs/Logs';
import { PlocProvider } from '../../hooks/ploc-context';
import './App.scss';

export function App() {
  return (
    <PlocProvider>
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
    </PlocProvider>
  );
}
