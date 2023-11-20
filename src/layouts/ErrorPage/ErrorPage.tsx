import { Link } from 'react-router-dom';
import classes from './ErrorPage.module.scss';
import { ErrorPageProps } from '../../types';

export default function ErrorPage({ message }: ErrorPageProps) {
  return (
    <div className={classes.error_wrapper} data-testid="error-page">
      <h1 className={classes.error_title}>AN ERROR HAS OCCURRED</h1>

      {message && (
        <>
          <h3 className={classes.error_message}>Error message:</h3>
          <h2 className={classes.error_description}>{message} </h2>
        </>
      )}

      <p className={classes.error_message}>Please, proceed to the main page.</p>
      <Link className={classes.home} to={'./'}>
        Take me home!
      </Link>
    </div>
  );
}
