import { ReactNode, createContext, useState } from 'react';
import { initialAppContext, initialItemData } from '../../utils/initialStates';
import { AppContextProps } from '../../types';

export type ContextProps = {
  children: ReactNode;
};

export const AppContext = createContext<AppContextProps>(initialAppContext);

export function AppContextProvider({ children }: ContextProps) {
  const [singleGameData, setSingleGameData] = useState(initialItemData);

  const values = {
    setSingleGameData,
    singleGameData
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
