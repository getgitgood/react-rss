import { ReactNode, createContext, useState } from 'react';
import {
  initialAppContext,
  initialSingleCardData
} from '../../utils/initialStates';
import { AppContextProps } from '../../types';

export type ContextProps = {
  children: ReactNode;
};

export const AppContext = createContext<AppContextProps>(initialAppContext);

export function AppContextProvider({ children }: ContextProps) {
  const [singleGameData, setSingleGameData] = useState(initialSingleCardData);

  const values = {
    setSingleGameData,
    singleGameData
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
