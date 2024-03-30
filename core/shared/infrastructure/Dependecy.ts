import { Provider } from './Provider'
import { MidiProvider } from '../../midi/infrastructure/MidiProvider'
import { ActionProvider } from '../../action/infrastructure/ActionProvider'

export const useMidi = () => new MidiProvider()
export const useAction = () => new ActionProvider()

export class Dependecy {
  private static buffer = new Map()

  public static use<P>(provider: Provider<P>) {
    const { name } = provider.constructor

    if (this.buffer.get(name)) {
      return <P>this.buffer.get(name)
    }

    const presenter = provider.use()
    this.buffer.set(name, presenter)
    return presenter
  }
}
