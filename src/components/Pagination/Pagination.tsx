import { useEffect, useState } from 'react';
import classes from './Pagination.module.scss';
import { NavData } from '../../types';
import { Link } from 'react-router-dom';

export default function Pagination(navData: NavData) {
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
      {navData.previous && (
        <Link
          to={`/game=${navData.name || 'all'}&page=${page - 1}`}
          className={classes.pagination_button}
          onClick={clickPrevHandler}
        >
          &lt;
        </Link>
      )}

      <a className={classes.pagination_button}>{page}</a>

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
  );
}
