import { Link } from 'react-router-dom';
import classes from './NotFound.module.scss';

export default function NotFound() {
  return (
    <div className={classes.error_wrapper}>
      <h1 className={classes.error_title}>AN ERROR HAS OCCURED</h1>
      <p className={classes.error_description}>
        Please, procced to the main page.
      </p>
      <Link className={classes.home} to={'./'}>
        Take me home!
      </Link>
    </div>
  );
}
