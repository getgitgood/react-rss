import { Link } from 'react-router-dom';
import classes from './ErrorPage.module.scss';

export default function ErrorPage() {
  return (
    <div className={classes.error_wrapper} data-testid="error-page">
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
