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

  const [limit, setLimit] = useState(localStorage.getItem('pageLimit') || '20');

  const [data, setData] = useState(initialResponse);

  const [itemData, setItemData] = useState(initialItemData);

  const handleLimitChange = (selectedLimit: string) => {
    localStorage.setItem('pageLimit', selectedLimit);
    setLimit(selectedLimit);
  };

  const values = {
    handleLimitChange,
    setItemData,
    setKeyword,
    setLimit,
    setData,
    itemData,
    keyword,
    limit,
    data
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
