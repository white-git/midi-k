import './Features'

export function Features() {
  return (
    <div className="features mb-2">
      <div className="row justify-end">
        <div className="col">
          <button className="btn btn_disabled">Tutorial</button>
        </div>
        <div className="col">
          <button className="btn btn_disabled">Load</button>
        </div>
        <div className="col">
          <button className="btn btn_disabled">Save</button>
        </div>
      </div>
    </div>
  )
}
