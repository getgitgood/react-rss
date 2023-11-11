import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AppContextProvider } from '../../components/Context/Context';

const RouterContextComponent = (children: ReactNode) => {
  return (
    <MemoryRouter>
      <AppContextProvider>{children}</AppContextProvider>
    </MemoryRouter>
  );
};

export default RouterContextComponent;
