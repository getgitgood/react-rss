import { NavLink } from 'react-router-dom';
import classes from './Header.module.scss';

export default function Header() {
  return (
    <header className={classes.header}>
      <nav className={classes.nav_bar}>
        <NavLink
          to={'/'}
          className={({ isActive }) =>
            isActive ? `${classes.link} ${classes.link_active}` : classes.link
          }
        >
          Home
        </NavLink>
        <NavLink
          to={'/uncontrol-form'}
          className={({ isActive }) =>
            isActive ? `${classes.link} ${classes.link_active}` : classes.link
          }
        >
          Uncontrol Form
        </NavLink>
        <NavLink
          to={'/react-form'}
          className={({ isActive }) =>
            isActive ? `${classes.link} ${classes.link_active}` : classes.link
          }
        >
          React Form
        </NavLink>
      </nav>
    </header>
  );
}
