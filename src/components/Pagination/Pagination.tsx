import { useState } from 'react';
import classes from './Pagination.module.scss';
import { LoaderResults } from '../../types';
import { Link, useAsyncValue, useParams } from 'react-router-dom';

export default function Pagination() {
  const data = useAsyncValue() as LoaderResults;
  const searchParams = useParams();
  const { next, previous } = data.response;
  const { page, game } = searchParams;
  const pageNumber = Number(page) || 1;
  const [currentPage, setPage] = useState(pageNumber);

  const clickNextHandler = async () => {
    setPage(currentPage + 1);
  };

  const clickPrevHandler = async () => {
    setPage(currentPage - 1);
  };

  return (
    <div className={classes.wrapper}>
      {previous && (
        <Link
          to={`/&game=${game || 'all'}&page=${currentPage - 1}`}
          className={classes.pagination_button}
          onClick={clickPrevHandler}
        >
          &lt;
        </Link>
      )}

      <a className={`${classes.pagination_button} ${classes.count}`}>{page}</a>

      {next && (
        <Link
          to={`/&game=${game || 'all'}&page=${currentPage + 1}`}
          className={classes.pagination_button}
          onClick={clickNextHandler}
        >
          &gt;
        </Link>
      )}
    </div>
  );
}
