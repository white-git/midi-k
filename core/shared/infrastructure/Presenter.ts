type Listener<S> = { (state: S): void }

export class Presenter<S> {
  public internalState: S
  public listeners: Listener<S>[]

  constructor(initialState: S) {
    this.internalState = initialState
    this.listeners = []
  }

  public get state() {
    return this.internalState
  }

  public subscribe(listener: Listener<S>) {
    this.listeners.push(listener)
  }

  public changeState(state: Partial<S>) {
    this.internalState = { ...this.internalState, ...state }
    this.listeners.forEach(listener => listener(this.state))
  }
}
