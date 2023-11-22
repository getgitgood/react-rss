import classes from './Pagination.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

export default function Pagination() {
  const { searchStr } = useAppSelector((state) => state.userInputs);
  const { next, previous } = useAppSelector((state) => state.cards.cardsList);
  const { page } = useParams();
  const pageNumber = Number(page) || 1;

  return (
    <div className={classes.wrapper}>
      {previous && (
        <Link
          to={`/&game=${searchStr || 'all'}&page=${pageNumber - 1}`}
          className={classes.pagination_button}
          data-testid="previous"
        >
          &lt;
        </Link>
      )}

      <a className={`${classes.pagination_button} ${classes.count}`}>
        {pageNumber}
      </a>

      {next && (
        <Link
          to={`/&game=${searchStr || 'all'}&page=${pageNumber + 1}`}
          className={classes.pagination_button}
          data-testid="next"
        >
          &gt;
        </Link>
      )}
    </div>
  );
}
