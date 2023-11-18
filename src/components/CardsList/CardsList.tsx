import classes from './CardsList.module.scss';
import Pagination from '../Pagination/Pagination';
import { Outlet, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import PaginationSkeleton from '../../layouts/PaginationSkeleton/PaginationSkeleton';
import Card from '../Card/Card';
import NoResults from '../../layouts/NoResults/NoResults';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { useGetGamesQuery } from '../../features/api/apiSlice';
import ErrorPage from '../../layouts/ErrorPage/ErrorPage';
import { cardListUpdated } from '../../features/cards/cardsListSlice';
import { useEffect } from 'react';

export default function CardsList() {
  const { searchStr, pageSize } = useAppSelector((state) => state.userInputs);
  const { page } = useParams();
  const { data, isFetching, isError, error } = useGetGamesQuery({
    searchStr,
    page,
    pageSize
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(cardListUpdated(data));
    }
  }, [data, dispatch]);

  if (isError && error instanceof Error) {
    return <ErrorPage message={error.message} />;
  }

  if (data) {
    return (
      <section className={classes.content}>
        <div className={classes.content_items}>
          {isFetching ? (
            <Loader />
          ) : data.count ? (
            data.results.map((item) => <Card key={item.id} {...item} />)
          ) : (
            <NoResults />
          )}
        </div>

        <div className={classes.pagination_container}>
          {isFetching ? <PaginationSkeleton /> : <Pagination />}
        </div>
        <Outlet />
      </section>
    );
  }
}