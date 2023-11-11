import classes from './NoResults.module.scss';

export default function NoResults() {
  return (
    <div className={classes.no_result_wrapper} data-testid="404">
      <h1 className={classes.title}>No results found.</h1>
      <p className={classes.description}>Proceed with another request...</p>
    </div>
  );
}
