import { DeferData, ResponseItem } from '../../types';
import classes from './content.module.scss';
import Pagination from '../Pagination/Pagination';
import {
  Await,
  LoaderFunctionArgs,
  Outlet,
  defer,
  useLoaderData
} from 'react-router-dom';
import { makeFetchRequest } from '../../api/apiClient';
import Loader from '../Loader/Loader';
import { Suspense } from 'react';
import { ContentItems } from '../ContentItems/ContentItems';

export async function contentLoader({ params, request }: LoaderFunctionArgs) {
  const id = params.id;
  const gameId = localStorage.getItem('searchStr');
  const url = new URL(request.url);
  const { pathname } = url;
  return defer({
    data: makeFetchRequest({
      queryStr: gameId ?? '',
      pageNumber: id
    }),
    pathname: pathname
  });
}

export function Content() {
  const deferData = useLoaderData() as DeferData<ResponseItem>;
  const data = deferData.data;

  return (
    <section className={classes.content}>
      <div className={classes.content_items}>
        <Suspense fallback={<Loader />}>
          <Await resolve={data}>
            <ContentItems />
          </Await>
        </Suspense>
      </div>
      <Suspense fallback={<div></div>}>
        <Await resolve={data}>
          <Pagination />
        </Await>
      </Suspense>
      <Outlet />
    </section>
  );
}
