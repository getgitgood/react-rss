import { Link } from 'react-router-dom';
import classes from './Page404.module.scss';

export default function Page404() {
  return (
    <>
      <div className={classes.no_result_wrapper} data-testid="page-404">
        <h1 className={classes.title}>404.</h1>
        <p className={classes.description}>
          Page you&apos;re requested doesn&apos;t exist.
        </p>
        <Link className={classes.home} to={'/'}>
          Take me home!
        </Link>
      </div>
    </>
  );
}
