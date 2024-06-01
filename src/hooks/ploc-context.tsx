import { useContext, createContext, ReactNode } from 'react';
import { ActionPloc } from '../../core/action/infrastructure/ActionPloc';
import { MidiPloc } from '../../core/midi/infrastructure/MidiPloc';

type PlocContext = {
  midiPloc: MidiPloc;
  actionPloc: ActionPloc;
};

type PlocProviderProps = {
  children: ReactNode;
};

function providers() {
  return {
    midiPloc: MidiPloc.use(),
    actionPloc: ActionPloc.use(),
  };
}

const PlocContext = createContext<PlocContext>({} as PlocContext);
const createUseContext = () => () => useContext(PlocContext);
export const plocContext = createUseContext();

export function PlocProvider({ children }: PlocProviderProps) {
  return (
    <PlocContext.Provider value={providers()}>
      {children}
    </PlocContext.Provider>
  );
}
