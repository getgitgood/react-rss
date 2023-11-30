import { Link } from 'react-router-dom';
import classes from './Header.module.scss';

export default function Header() {
  return (
    <header className={classes.header}>
      <nav className={classes.nav_bar}>
        <Link to={'/'} className={classes.link}>
          Home
        </Link>
        <Link to={'/uncontrol-form'} className={classes.link}>
          Uncontrol Form
        </Link>
        <Link to={'/react-form'} className={classes.link}>
          React Form
        </Link>
      </nav>
    </header>
  );
}
