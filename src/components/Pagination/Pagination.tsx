import { useContext, useState } from 'react';
import classes from './Pagination.module.scss';
import { Link, useParams } from 'react-router-dom';
import { AppContext } from '../Context/Context';

export default function Pagination() {
  const { gamesData, keyword } = useContext(AppContext);
  const searchParams = useParams();
  const { next, previous } = gamesData;
  const { page } = searchParams;
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
          to={`/&game=${keyword || 'all'}&page=${currentPage - 1}`}
          className={classes.pagination_button}
          onClick={clickPrevHandler}
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
          to={`/&game=${keyword || 'all'}&page=${currentPage + 1}`}
          className={classes.pagination_button}
          onClick={clickNextHandler}
          data-testid="next"
        >
          &gt;
        </Link>
      )}
    </div>
  );
}
