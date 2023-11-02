import { Outlet, useNavigation } from 'react-router-dom';
import Header from '../Header/Header';
import Loader from '../../components/Loader/Loader';

export function RootLayout() {
  const navigation = useNavigation();

  return (
    <>
      <Header />
      <main>{navigation.state === 'loading' ? <Loader /> : <Outlet />}</main>
    </>
  );
}
