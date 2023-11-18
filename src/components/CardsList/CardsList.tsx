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
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { errorMessageMiddleware } from '../../utils/helpers';
import Page404 from '../../layouts/Page404/Page404';
import { cardsListLoadingUpdated } from '../../features/loadings/loadersSlice';

export type CustomError = {
  message: string;
  stack: string;
};

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
    dispatch(cardsListLoadingUpdated(isFetching));
    if (data && !isError) {
      dispatch(cardListUpdated(data));
    }
  }, [dispatch, isFetching, data, isError]);

  if (isError) {
    if ('status' in error && error.status === 404) {
      return <Page404 />;
    }
    const message = errorMessageMiddleware(error as FetchBaseQueryError);
    return <ErrorPage message={message} />;
  }

  if (isFetching || data === undefined) {
    return (
      <section className={classes.content}>
        <div className={classes.content_items}>
          <Loader />
        </div>
        <div className={classes.pagination_container}>
          <PaginationSkeleton />
        </div>
      </section>
    );
  }

  return (
    <section className={classes.content}>
      <div className={classes.content_items}>
        {data.count ? (
          data.results.map((item) => <Card key={item.id} {...item} />)
        ) : (
          <NoResults />
        )}
      </div>

      <div className={classes.pagination_container}>
        <Pagination />
      </div>
      <Outlet />
    </section>
  );
}
