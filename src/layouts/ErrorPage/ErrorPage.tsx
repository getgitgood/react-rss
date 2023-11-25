import Link from 'next/link';
import classes from './ErrorPage.module.scss';

export default function ErrorPage({ error }: { error?: Error }) {
  return (
    <div className={classes.error_wrapper} data-testid="error-page">
      <h1 className={classes.error_title}>AN ERROR HAS OCCURRED</h1>

      {error?.message && (
        <>
          <h3 className={classes.error_message}>Error message:</h3>
          <h2 className={classes.error_description}>{error.message} </h2>
        </>
      )}

      <p className={classes.error_message}>Please, proceed to the main page.</p>
      <Link className={classes.home} href={'/'}>
        Take me home!
      </Link>
    </div>
  );
}
