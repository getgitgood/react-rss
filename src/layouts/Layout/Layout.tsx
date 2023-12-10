import { Outlet } from 'react-router-dom';
import classes from './Layout.module.scss';
import Header from '../Header/Header';

export default function Layout() {
  return (
    <>
      <Header />
      <div className={classes.content}>
        <Outlet />
      </div>
    </>
  );
}
