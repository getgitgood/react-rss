import { ReactNode, createContext, useState } from 'react';
import {
  initialAppContext,
  initialItemData,
  initialResponse
} from '../../utils/initialStates';
import { AppContextProps } from '../../types';

export type ContextProps = {
  children: ReactNode;
};

export const AppContext = createContext<AppContextProps>(initialAppContext);

export function AppContextProvider({ children }: ContextProps) {
  const [gamesData, setGamesData] = useState(initialResponse);

  const [singleGameData, setSingleGameData] = useState(initialItemData);

  const values = {
    setSingleGameData,
    setGamesData,
    singleGameData,
    gamesData
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
