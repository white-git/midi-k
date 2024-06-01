import { Channel } from './inputs/channel/Channel';
import { Delay } from './inputs/delay/Delay';
import { Device } from './inputs/device/Device';
import './Control.scss';

export function Control() {
  return (
    <div className="control">
      <div className="row">
        <div className="col-12">
          <Device />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <Channel />
        </div>
        <div className="col-6">
          <Delay />
        </div>
      </div>
    </div>
  );
}
