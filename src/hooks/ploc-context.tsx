import { useContext, createContext } from 'react';
import * as providers from '../../core/common/infrastructure/Provider';

function createPlocContext() {
  const context = createContext<typeof providers>({} as typeof providers);
  return [context, () => useContext(context)] as const;
}

export const [PlocContext, usePloc] = createPlocContext();
