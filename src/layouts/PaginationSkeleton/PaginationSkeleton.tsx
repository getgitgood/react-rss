import classes from './PaginationSkeleton.module.scss';

export default function PaginationSkeleton() {
  return (
    <div className={classes.skeleton}>
      <div className={classes.items}></div>
      <div className={classes.items}></div>
      <div className={classes.items}></div>
    </div>
  );
}
