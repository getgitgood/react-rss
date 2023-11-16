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
  const [keyword, setKeyword] = useState(
    localStorage.getItem('searchStr') || ''
  );

  const [pageLimit, setPageLimit] = useState(
    localStorage.getItem('pageLimit') || '30'
  );

  const [gamesData, setGamesData] = useState(initialResponse);

  const [singleGameData, setSingleGameData] = useState(initialItemData);

  const handlePageLimitChange = (selectedPageLimit: string) => {
    localStorage.setItem('pageLimit', selectedPageLimit);
    setPageLimit(selectedPageLimit);
  };

  const values = {
    handlePageLimitChange,
    setSingleGameData,
    setKeyword,
    setPageLimit,
    setGamesData,
    singleGameData,
    keyword,
    pageLimit,
    gamesData
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
