import { useEffect, useMemo, useState } from 'react';
import classes from './Pagination.module.scss';
import { LoaderResults } from '../../types';
import { Link, useAsyncValue } from 'react-router-dom';

export default function Pagination() {
  const data = useAsyncValue() as LoaderResults;
  const navData = useMemo(() => {
    return {
      current: data.pageNumber,
      count: data.response.count,
      next: data.response.next,
      previous: data.response.previous,
      name: data.queryStr
    };
  }, [
    data.pageNumber,
    data.response.count,
    data.response.next,
    data.response.previous,
    data.queryStr
  ]);

  const [page, setPage] = useState(Number(navData.current));

  useEffect(() => {
    setPage(Number(navData.current));
  }, [navData]);

  const clickNextHandler = async () => {
    setPage(page + 1);
  };

  const clickPrevHandler = async () => {
    setPage(page - 1);
  };

  return (
    <div className={classes.pagination_container}>
      <div className={classes.wrapper}>
        {navData.previous && (
          <Link
            to={`/game=${navData.name || 'all'}&page=${page - 1}`}
            className={classes.pagination_button}
            onClick={clickPrevHandler}
          >
            &lt;
          </Link>
        )}

        <a className={`${classes.pagination_button} ${classes.count}`}>
          {page}
        </a>

        {navData.next && (
          <Link
            to={`/game=${navData.name || 'all'}&page=${page + 1}`}
            className={classes.pagination_button}
            onClick={clickNextHandler}
          >
            &gt;
          </Link>
        )}
      </div>
    </div>
  );
}
