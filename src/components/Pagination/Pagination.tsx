import classes from './Pagination.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ApiResponse } from '../../types';

export default function Pagination({ gameData }: { gameData: ApiResponse }) {
  const { next, previous } = gameData;
  const router = useRouter();
  const { search, page, page_size } = router.query;
  const pageNumber = Number(page) || 1;

  return (
    <div className={classes.wrapper}>
      {previous && (
        <Link
          href={{
            pathname: '/',
            query: {
              search: search,
              page: `${pageNumber - 1}`,
              page_size: page_size
            }
          }}
          as={`/games/${search || 'all'}?page=${pageNumber - 1}`}
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
          href={{
            pathname: '/',
            query: {
              search: search,
              page: `${pageNumber + 1}`,
              page_size: page_size
            }
          }}
          as={`/games/${search || 'all'}?page=${pageNumber + 1}`}
          className={classes.pagination_button}
          data-testid="next"
        >
          &gt;
        </Link>
      )}
    </div>
  );
}
