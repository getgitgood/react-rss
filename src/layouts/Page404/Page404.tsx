import Link from 'next/link';
import classes from './Page404.module.scss';

export default function Page404() {
  return (
    <>
      <div className={classes.no_result_wrapper} data-testid="page-404">
        <h1 className={classes.title}>404.</h1>
        <p className={classes.description}>
          Page you`re requested doesn`t exist.
        </p>
        <Link className={classes.home} href={'/'}>
          Take me home!
        </Link>
      </div>
    </>
  );
}
