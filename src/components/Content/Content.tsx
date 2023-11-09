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
import { sliceTrailingSlash } from '../../utils/helpers';
import Fader from '../../layouts/Fallbacks/Fader';

export async function contentLoader({ request }: LoaderFunctionArgs) {
  const searchParams = new URLSearchParams(request.url);
  const game = searchParams.get('game');
  const page = searchParams.get('page');
  const formattedPage = sliceTrailingSlash(page!);

  return defer({
    data: makeFetchRequest({
      queryStr: game ?? '',
      pageNumber: formattedPage ?? '1'
    })
  });
}

export function Content() {
  const deferData = useLoaderData() as DeferData<ResponseItem>;
  const { data } = deferData;

  return (
    <section className={classes.content}>
      <div className={classes.content_items}>
        <Suspense fallback={<Loader />}>
          <Await resolve={data}>
            <ContentItems />
          </Await>
        </Suspense>
      </div>

      <div className={classes.pagination_container}>
        <Suspense fallback={<Fader />}>
          <Await resolve={data}>
            <Pagination />
          </Await>
        </Suspense>
        <Outlet />
      </div>
    </section>
  );
}
